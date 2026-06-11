import { create } from 'zustand';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

// 1. Create the mathematical CRDT Document
export const ydoc = new Y.Doc();

// 2. Persist it to the browser's offline storage (Client-side only)
export const indexeddbProvider = typeof window !== 'undefined' ? new IndexeddbPersistence('rescue-mesh-db', ydoc) : null;

// 3. Connect to the local Mesh Node (ESP8266 NodeMCU) / Backend WebSocket
export const wsProvider = typeof window !== 'undefined' ? new WebsocketProvider('ws://localhost:1234', 'rescue-mesh-room', ydoc) : null;

// 4. Create a shared Map for all SOS Requests
export const yRequestsMap = ydoc.getMap('requests');

export const useAppStore = create((set, get) => ({
  isOffline: false,

  toggleOfflineMode: async () => {
    const { isOffline } = get();
    
    if (isOffline) {
      set({ isOffline: false });
      if (wsProvider) wsProvider.connect();
      alert("Connected to Mesh Network. CRDTs will instantly sync and merge offline data.");
    } else {
      set({ isOffline: true });
      if (wsProvider) wsProvider.disconnect();
      alert("Mesh Network Offline Mode Activated. Data is saved to CRDT and will merge when reconnected.");
    }
  },

  // No longer needed, Yjs handles it natively!
  cacheOfflineRequest: (requestPayload) => {
    const id = 'req-' + crypto.randomUUID();
    yRequestsMap.set(id, { ...requestPayload, id, status: 'pending', severityLabel: 'medium' });
  }
}));
