import { randomUUID } from "node:crypto";
import { calculatePriority, deriveSeverityLabel } from "./priority";
import { AssignmentResult, Resource, SosRequest, SosRequestInput } from "./types";

const INITIAL_RESOURCES: Resource[] = [
  { id: "res-amb-1", name: "Ambulance Alpha", type: "ambulance", area: "Sector 7", available: true },
  { id: "res-med-1", name: "Medical Team Bravo", type: "medical_team", area: "Sector 9", available: true },
  { id: "res-fire-1", name: "Fire Unit Delta", type: "fire_team", area: "Industrial Block", available: true },
  { id: "res-shelter-1", name: "Shelter Van Echo", type: "shelter_unit", area: "Central Camp", available: true },
  { id: "res-food-1", name: "Food Supply Foxtrot", type: "food_supply", area: "Warehouse Hub", available: true }
];

let requests: SosRequest[] = [];
let resources: Resource[] = cloneResources();

export function createSosRequest(input: SosRequestInput): SosRequest {
  const priorityScore = calculatePriority(input);
  const severityLabel = input.severityLabel ?? deriveSeverityLabel(priorityScore);

  const request: SosRequest = {
    id: randomUUID(),
    ...input,
    priorityScore,
    severityLabel,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  requests = [...requests, request];
  return request;
}

export function listRequests(status?: string): SosRequest[] {
  return requests
    .filter((request) => !status || request.status === status)
    .slice()
    .sort((
    });
}

export function listResources(): Resource[] {
  return resources.slice();
}

export function assignResource(requestId: string, resourceId?: string): AssignmentResult {
  const request = requests.find((item) => item.id === requestId);
  if (!request) {
    throw new Error("REQUEST_NOT_FOUND");
  }

  if (request.status === "assigned") {
    throw new Error("REQUEST_ALREADY_ASSIGNED");
  }

  const resource = resourceId
    ? resources.find((item) => item.id === resourceId)
    : findBestResource(request);

  if (!resource) {
    throw new Error("RESOURCE_NOT_FOUND");
  }

  if (!resource.available) {
    throw new Error("RESOURCE_UNAVAILABLE");
  }

  const updatedResource = { ...resource, available: false };
  resources = resources.map((item) => (item.id === resource.id ? updatedResource : item));

  const updatedRequest: SosRequest = {
    ...request,
    status: "assigned",
    assignedResourceId: resource.id
  };

  requests = requests.map((item) => (item.id === request.id ? updatedRequest : item));

  return {
    request: updatedRequest,
    resource: updatedResource
  };
}

export function resetStore(): void {
  requests = [];
  resources = cloneResources();
}

function findBestResource(request: SosRequest): Resource | undefined {
  const preferredType = request.neededResources?.[0];

  if (preferredType) {
    const exactMatch = resources.find((resource) => resource.available && resource.type === preferredType);
    if (exactMatch) {
      return exactMatch;
    }
  }

  return resources.find((resource) => resource.available);
}

function cloneResources(): Resource[] {
  return INITIAL_RESOURCES.map((resource) => ({ ...resource }));
}
