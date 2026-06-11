/* Authors: BENADIC90, Member 1, Member 2, Member 3 */
// Team note: In-memory database simulation for storing SOS requests and dispatching resources.
import { randomUUID } from "node:crypto";
import { calculatePriority, deriveSeverityLabel, generateAiSummary } from "./priority";
import { AssignmentResult, Resource, SosRequest, SosRequestInput } from "./types";

const BASE_RESOURCES = [
  { name: "Ambulance", type: "ambulance", area: "Sector 7", available: true },
  { name: "Medical Team", type: "medical_team", area: "Sector 9", available: true },
  { name: "Fire Unit", type: "fire_team", area: "Industrial Block", available: true },
  { name: "Shelter Van", type: "shelter_unit", area: "Central Camp", available: true },
  { name: "Food Supply", type: "food_supply", area: "Warehouse Hub", available: true }
];

const INITIAL_RESOURCES: Resource[] = BASE_RESOURCES.flatMap((base) => 
  Array.from({ length: 10 }).map((_, i) => ({
    ...base,
    type: base.type as Resource["type"],
    id: `res-${base.type}-${i + 1}`,
    name: `${base.name} ${i + 1}`
  }))
);

let requests: SosRequest[] = [];
let resources: Resource[] = cloneResources();

export function createSosRequest(input: SosRequestInput): SosRequest {
  const priorityScore = calculatePriority(input);
  const severityLabel = input.severityLabel ?? deriveSeverityLabel(priorityScore);

  const request: SosRequest = {
    ...input,
    id: randomUUID(),
    priorityScore,
    severityLabel,
    aiSummary: generateAiSummary(input),
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
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

export function listResources(): Resource[] {
  return resources.slice();
}

// Team note: Validates and assigns multiple resources to an SOS request, or auto-assigns best fallback.
export function assignResource(requestId: string, resourceIds?: string[]): AssignmentResult {
  const request = requests.find((item) => item.id === requestId);
  if (!request) {
    throw new Error("REQUEST_NOT_FOUND");
  }

  if (request.status === "assigned") {
    throw new Error("REQUEST_ALREADY_ASSIGNED");
  }

  let selectedResources: Resource[] = [];

  if (resourceIds && resourceIds.length > 0) {
    for (const rid of resourceIds) {
      const res = resources.find((item) => item.id === rid);
      if (!res) throw new Error(`RESOURCE_NOT_FOUND: ${rid}`);
      if (!res.available) throw new Error(`RESOURCE_UNAVAILABLE: ${rid}`);
      selectedResources.push(res);
    }
  } else {
    const bestMatch = findBestResource(request);
    if (!bestMatch) throw new Error("RESOURCE_NOT_FOUND");
    selectedResources.push(bestMatch);
  }

  // Mark resources unavailable
  selectedResources = selectedResources.map(res => ({ ...res, available: false }));
  
  resources = resources.map((item) => {
    const updated = selectedResources.find(sr => sr.id === item.id);
    return updated ? updated : item;
  });

  const updatedRequest: SosRequest = {
    ...request,
    status: "assigned",
    assignedResourceIds: selectedResources.map(r => r.id)
  };

  requests = requests.map((item) => (item.id === request.id ? updatedRequest : item));

  return {
    request: updatedRequest,
    resources: selectedResources
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
