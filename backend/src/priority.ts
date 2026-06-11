/* Authors: BENADIC90, Member 1, Member 2, Member 3 */
// Team note: Core logic for calculating SOS priority scores based on predefined rules.
import { SosRequestInput } from "./types";

export function clampPriority(score: number): number {
  return Math.max(0, Math.min(100, score));
}

export function generateAiSummary(input: SosRequestInput): string {
  let summary = "";
  const findings: string[] = [];

  if (/\b(trapped|collapsed|buried|stuck)\b/i.test(input.message)) {
    findings.push("Potential entrapment");
  }
  if (/\b(fire|burn|smoke)\b/i.test(input.message)) {
    findings.push("Fire hazard");
  }
  if (/\b(bleed|blood|unconscious|injury|hurt)\b/i.test(input.message)) {
    findings.push("Medical emergency");
  }
  if (/\b(water|flood|drown)\b/i.test(input.message)) {
    findings.push("Water rescue");
  }

  if (findings.length > 0) {
    summary = findings.join(", ") + " detected. ";
  }

  if (input.peopleCount && input.peopleCount > 10) {
    summary += "Mass casualty event. ";
  }

  return summary || "Standard emergency request.";
}

export function calculatePriority(input: SosRequestInput): number {
  let score = input.priorityScore ?? 50;

  if (input.peopleCount) {
    if (input.peopleCount > 100) score += 40;
    else if (input.peopleCount > 10) score += 20;
    else if (input.peopleCount > 5) score += 10;
  }

  const message = input.message.toLowerCase();
  if (message.includes("trapped") || message.includes("fire")) score += 30;
  if (message.includes("unconscious") || message.includes("bleeding")) score += 25;
  if (message.includes("food") || message.includes("water")) score += 10;

  return clampPriority(score);
}

export function deriveSeverityLabel(score: number): "low" | "medium" | "high" | "critical" {
  if (score >= 80) return "critical";
  if (score >= 60) return "high";
  if (score >= 40) return "medium";
  return "low";
}
