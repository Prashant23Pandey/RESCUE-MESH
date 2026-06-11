# RESCUE-MESH Backend & AI Engine (Members 2 & 3)

This directory contains the core API, database, and AI priority engine for the RESCUE-MESH platform.

## 🧠 AI Priority Engine (Member 2)
Located in `src/ai_engine.py` (and implemented in TS via `src/priority.ts`).
- **Triage System:** Uses an NLP keyword classifier (Regex) to detect critical terms like "bleeding", "collapsed", or "fire".
- **Severity Scoring:** Automatically calculates a priority score (0-100) and assigns a severity label (CRITICAL, HIGH, MEDIUM, LOW) based on message content, people count, and needed resources.
- **Deliverable:** `calculate_priority(request)` function.

## ⚙️ Backend & Database (Member 3)
Built with Node.js and Express.
- **Data Store:** In-memory storage for active SOS requests and rescue resources.
- **Assignment Logic:** Auto-assigns the best available resource (e.g., Ambulance) to incoming high-priority requests.
- **Endpoints:**
  - `POST /send_sos` - Submit a new emergency request.
  - `GET /get_requests` - Retrieve all active SOS requests.
  - `POST /assign_resource` - Dispatches a resource to a specific request ID.

## 📦 How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the API server:
   ```bash
   npm run dev
   ```
   *The backend will run on http://localhost:4000*
