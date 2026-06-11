# RESCUE-MESH Frontend (Member 1)

This directory contains the user interface for the RESCUE-MESH platform, fulfilling all Member 1 deliverables.

## 🚀 Features
- **SOS Form (`/`):** Allows victims to submit emergencies. Includes an "Auto-detect My Exact Location" feature via the browser Geolocation API.
- **Status Checker (`/status`):** Victims can check if their request is pending or if a resource has been assigned.
- **Command Dashboard (`/dashboard`):** Real-time command center displaying active SOS requests sorted by priority severity, alongside available responder resources.
- **Live Map (`/map`):** Interactive Leaflet map displaying active emergencies.

## 🛠️ Tech Stack
- React
- Next.js
- Axios
- React-Leaflet
- Pure CSS (Dark Mode)

## 📦 How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
