import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { assignResource, createSosRequest, listRequests, listResources } from "./store";
import { assignResourceSchema, sendSosSchema } from "./validation";

export const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_request: Request, response: Response) => {
  response.json({ success: true, message: "Backend is healthy" });
});

// Team note: this endpoint accepts raw victim messages and stores the normalized SOS request.
app.post("/send_sos", (request: Request, response: Response, next: NextFunction) => {
  try {
    const payload = sendSosSchema.parse(request.body);
    const sosRequest = createSosRequest(payload);

    response.status(201).json({
      success: true,
      data: sosRequest
    });
  } catch (error) {
    next(error);
  }
});

// Team note: the list is sorted by highest priority first so dispatch sees urgent cases first.
app.get("/get_requests", (request: Request, response: Response) => {
  const status = typeof request.query.status === "string" ? request.query.status : undefined;
  const requests = listRequests(status);

  response.json({
    success: true,
    count: requests.length,
    data: requests
  });
});

// Team note: this exposes the current resource pool for dashboard or admin integration.
app.get("/resources", (_request: Request, response: Response) => {
  response.json({
    success: true,
    count: listResources().length,
    data: listResources()
  });
});

// Team note: if resourceId is omitted, backend auto-picks the best available matching resource.
app.post("/assign_resource", (request: Request, response: Response, next: NextFunction) => {
  try {
    const payload = assignResourceSchema.parse(request.body);
    const assignment = assignResource(payload.requestId, payload.resourceId);

    response.json({
      success: true,
      data: assignment
    });
  } catch (error) {
    next(error);
  }
});

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      success: false,
      error: "Invalid request payload",
      details: error.flatten()
    });
    return;
  }

  if (error instanceof Error) {
    const errorMap: Record<string, { status: number; message: string }> = {
      REQUEST_NOT_FOUND: { status: 404, message: "SOS request not found" },
      REQUEST_ALREADY_ASSIGNED: { status: 409, message: "SOS request is already assigned" },
      RESOURCE_NOT_FOUND: { status: 404, message: "No matching resource found" },
      RESOURCE_UNAVAILABLE: { status: 409, message: "Selected resource is unavailable" }
    };

    const mapped = errorMap[error.message];
    if (mapped) {
      response.status(mapped.status).json({
        success: false,
        error: mapped.message
      });
      return;
    }
  }

  response.status(500).json({
    success: false,
    error: "Internal server error"
  });
});
