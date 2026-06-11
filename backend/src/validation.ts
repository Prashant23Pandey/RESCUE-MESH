/* Authors: BENADIC90, Member 1, Member 2, Member 3 */
import { z } from "zod";

const resourceTypes = [
  "ambulance",
  "medical_team",
  "fire_team",
  "shelter_unit",
  "food_supply"
] as const;

export const sendSosSchema = z.object({
  reporterName: z.string().trim().min(2).max(80).optional(),
  contactNumber: z.string().trim().min(7).max(20).optional(),
  location: z.object({
    area: z.string().trim().min(2).max(120),
    lat: z.number().min(-90).max(90).optional(),
    lng: z.number().min(-180).max(180).optional()
  }),
  message: z.string().trim().min(5).max(1000),
  peopleCount: z.number().int().min(1).max(500).optional(),
  neededResources: z.array(z.enum(resourceTypes)).max(5).optional(),
  priorityScore: z.number().min(0).max(100).optional(),
  severityLabel: z.enum(["low", "medium", "high", "critical"]).optional()
});

export const assignResourceSchema = z.object({
  requestId: z.string().trim().min(1),
  resourceIds: z.array(z.string().trim().min(1)).optional()
});
