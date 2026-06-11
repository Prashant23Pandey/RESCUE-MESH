import re

KEYWORD_WEIGHTS = [
    {"pattern": re.compile(r"\b(trapped|collapsed|buried)\b", re.IGNORECASE), "weight": 35},
    {"pattern": re.compile(r"\b(unconscious|bleeding|critical|not breathing)\b", re.IGNORECASE), "weight": 35},
    {"pattern": re.compile(r"\b(fire|explosion|burning)\b", re.IGNORECASE), "weight": 30},
    {"pattern": re.compile(r"\b(child|children|pregnant|elderly)\b", re.IGNORECASE), "weight": 15},
    {"pattern": re.compile(r"\b(injured|fracture|pain|medical)\b", re.IGNORECASE), "weight": 20},
    {"pattern": re.compile(r"\b(no food|hungry|water|stranded)\b", re.IGNORECASE), "weight": 10}
]

def clamp_priority(score: int) -> int:
    """Ensure score is strictly between 0 and 100."""
    return max(0, min(100, round(score)))

def calculate_priority(request: dict) -> int:
    """
    Calculate priority score based on the SOS request.
    """
    if "priorityScore" in request and request["priorityScore"] is not None:
        return clamp_priority(request["priorityScore"])

    score = 20
    message = request.get("message", "")

    for rule in KEYWORD_WEIGHTS:
        if rule["pattern"].search(message):
            score += rule["weight"]

    people_count = request.get("peopleCount", 1)
    if people_count and people_count > 1:
        score += min(people_count * 3, 20)

    needed_resources = request.get("neededResources", [])
    if "ambulance" in needed_resources:
        score += 10

    return clamp_priority(score)

def derive_severity_label(priority_score: int) -> str:
    """Map a numerical priority score to a severity label."""
    if priority_score >= 85:
        return "critical"
    if priority_score >= 65:
        return "high"
    if priority_score >= 40:
        return "medium"
    return "low"

if __name__ == "__main__":
    # Built-in demo for testing
    test_req = {
        "message": "Building collapsed, 5 people trapped inside",
        "peopleCount": 5,
        "neededResources": ["ambulance", "fire_team"]
    }
    score = calculate_priority(test_req)
    label = derive_severity_label(score)
    print(f"Request: {test_req['message']}")
    print(f"Priority Score: {score} ({label.upper()})")
