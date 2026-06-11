export type RequestStatus = "pending" | "assigned";

export type ResourceType =
  | "ambulance"
  | "medical_team"
  | "fire_team"
  | "shelter_unit"
  | "food_supply";

export interface LocationPayload {
  area: string;
  lat?: number;
  lng?: number;
}

export interface SosRequestInput {
  reporterName?: string;
  contactNumber?: string;
  location: LocationPayload;
  message: string;
  peopleCount?: number;
  neededResources?: ResourceType[];
  priorityScore?: number;
  severityLabel?: "low" | "medium" | "high" | "critical";
}

export interface SosRequest extends SosRequestInput {
  id: string;
  status: RequestStatus;
  priorityScore: number;
  severityLabel: "low" | "medium" | "high" | "critical";
  createdAt: string;
  assignedResourceId?: string;
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  area: string;
  available: boolean;
}

export interface AssignmentResult {
  request: SosRequest;
  resource: Resource;
}
