# RESCUE-MESH 🚨

A Modular Decentralized Response Framework designed to ensure life-critical aid reaches victims even during "Information Blackouts" when cellular networks collapse.

---

## 👥 Team Contributions

### 📱 Member 1: Frontend & App UI
**Directory:** `frontend/`
- **Responsibilities:** Built the Ground-Zero User Interface.
- **Deliverables:** SOS Submission Form, Responder Dashboard, Live Emergency Map View, and Status Checker. Connected the UI to the backend API.
- **Tech:** React & Next.js

### 🧠 Member 2: AI + Priority Engine
**Directory:** `backend/src/ai_engine.py`
- **Responsibilities:** Designed the autonomous triaging system to reduce Response Latency.
- **Deliverables:** Implemented the `calculate_priority(request)` function using an NLP Keyword Classifier. Automatically converts emergency text into a 0-100 severity score and assigns CRITICAL/HIGH/MEDIUM/LOW labels.

### ⚙️ Member 3: Backend + Database
**Directory:** `backend/`
- **Responsibilities:** Built the core infrastructure, API logic, and resource ledger.
- **Deliverables:** Created Node.js/Express API endpoints (`/send_sos`, `/get_requests`, `/assign_resource`). Managed the in-memory database to store SOS requests and handle logistics/assignment logic.

---

## 🚀 How to Start the Project

**1. Start the Backend API (Port 4000)**
```bash
cd backend
npm install
npm run dev
```

**2. Start the Frontend UI (Port 3000)**
```bash
cd frontend
npm install
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** to view the application.
