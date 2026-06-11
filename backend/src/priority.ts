import { SosRequestInput } from "./types";

const KEYWORD_WEIGHTS: Array<{ pattern: RegExp; weight: number }> = [
  { pattern: /\b(trapped|collapsed|buried)\b/i, weight: 35 },
  { pattern: /\b(unconscious|bleeding|critical|not breathing)\b/i, weight: 35 },
  { pattern: /\b(fire|explosion|burning)\b/i, weight: 30 },
  { pattern: /\b(child|children|pregnant|elderly)\b/i, weight: 15 },
  { pattern: /\b(injured|fracture|pain|medical)\b/i, weight: 20 },
  { pattern: /\b(no food|hungry|water|stranded)\b/i, weight: 10 }
];

export function calculatePriority(input: SosRequestInput): number {
  if (typeof input.priorityScore === "number") {
    return clampPriority(input.priorityScore);
  }

  let score = 20;

  for (const rule of KEYWORD_WEIGHTS) {
    if (rule.pattern.test(input.message)) {
      score += rule.weight;
    }
  }

  if (input.peopleCount && input.peopleCount > 1) {
    score += Math.min(input.peopleCount * 3, 20);
  }

  if (input.neededResources?.includes("ambulance")) {
    score += 10;
  }

  return clampPriority(score);
}

export function deriveSeverityLabel(priorityScore: number): "low" | "medium" | "high" | "critical" {
  if (priorityScore >= 85) {
    return "critical";
  }

  if (priorityScore >= 65) {
    return "high";
  }

  if (priorityScore >= 40) {
    return "medium";
  }

  return "low";
}

function clampPriority(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}
