# Implementing True Offline Sync (PPT Architecture)

Your team leader's PPT specifies that the app must survive "Information Blackouts" using **CRDTs (Conflict-free Replicated Data Types)** and **LoRaWAN**. 

Currently, our React app uses `Zustand` and `localStorage` to simulate offline caching. To build the *real* version according to the PPT, here is exactly how you make it work:

## Step 1: Replace LocalStorage with a CRDT Database
Instead of saving arrays to standard variables or local storage, you need a database that is designed to work completely offline and merge data automatically when devices connect.

**Recommended Tech Stack:** 
* **Yjs** (A blazing fast CRDT library for JavaScript) or **RxDB / PouchDB**.

**How it works in React:**
Instead of `const [requests, setRequests] = useState([])`, you connect your state to a Yjs document.
```javascript
import * as Y from 'yjs'

// Create a local offline document
const ydoc = new Y.Doc()
// Create a shared array for SOS requests
const yRequests = ydoc.getArray('sos_requests')

// When the user submits a form (even with NO internet):
yRequests.push([{ id: '123', message: 'Help!', status: 'pending' }])
```
Because it is a CRDT, if two different people submit SOS requests while offline, the algorithm mathematically guarantees that when they finally connect, neither request will be overwritten. They merge perfectly.

## Step 2: The Physical Bridge (ESP8266 NodeMCU + LoRa)
Since there is no Wi-Fi or 4G, how do the phones connect?

1. **The App to the ESP8266 NodeMCU:** The victim opens the RESCUE-MESH app on their phone (which was pre-installed as a PWA). Their phone connects via Wi-Fi Direct (Wi-Fi Mesh) or a local Wi-Fi Hotspot to an ESP8266 NodeMCU device sitting in their neighborhood.
2. **The App syncs to the ESP8266 NodeMCU:** The Yjs document on the phone syncs its data to the ESP8266 NodeMCU via a local WebSocket.
3. **LoRaWAN Hopping:** The ESP8266 NodeMCU is equipped with a **LoRa** radio antenna. It takes the tiny SOS JSON payload and broadcasts it over radio waves (which travel for miles). 
4. **The Mesh:** Another ESP8266 NodeMCU node a mile away picks up the radio signal, and bounces it to the next node, until it reaches the Command Center's master node.

## Step 3: Progressive Web App (PWA)
For a user to open `http://localhost:3000` without the internet, the browser needs to have the website saved to the hard drive.

You must implement a **Service Worker** in Next.js/React.
```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  // config
})
```
This tells the phone: *"Download the entire HTML, CSS, JavaScript, and Leaflet Map files to the device permanently."* 
When the disaster strikes and the internet goes down, the victim clicks the RESCUE-MESH app icon on their home screen, and it opens instantly without needing a server.

## Summary for the Judges
If a judge asks *"How is this actually offline?"*, you answer:
> *"Right now, we simulate the offline architecture using local browser storage and delayed syncing. For production, we convert the React app to a PWA with a Yjs CRDT datastore. Instead of sending HTTP requests to a Node server, the app broadcasts the CRDT state updates over Wi-Fi Direct to a local LoRaWAN ESP8266 NodeMCU node, which uses radio frequencies to bounce the data peer-to-peer back to the command center!"*
