# RESCUE-MESH

Modular Decentralized Response Framework (MDRF) – Phase 1 MVP implementation.

## Overview
- **Frontend** – React Native (Expo) with offline‑first UI for Victim SOS triage and Responder dashboard.
- **Gateway** – Node.js/Express command node running on a Raspberry Pi or laptop, hosting REST & WebSocket APIs, TensorFlow‑Lite inference, and Yjs CRDT sync.
- **ESP32 LoRa Bridge** – Firmware to forward Bluetooth/BLE packets over LoRaWAN mesh.
- **Docs** – Architecture diagrams, API specs, and connectivity guides.

## Quick Start
```bash
# Clone
git clone https://github.com/Prashant23Pandey/RESCUE-MESH.git
cd RESCUE-MESH

# Frontend
git submodule update --init --recursive
npm install --prefix frontend
npm start --prefix frontend   # Expo dev server

# Gateway
npm install --prefix gateway
npm run dev --prefix gateway   # Starts Express + Yjs websocket

# ESP32 Firmware (requires PlatformIO)
cd esp32
platformio run -t upload
```

See `docs/` for detailed architecture and API contracts.
