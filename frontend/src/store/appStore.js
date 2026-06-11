import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const useAppStore = create((set, get) => ({
  isOffline: false,
  offlineRequests: [],

  toggleOfflineMode: async () => {
    const { isOffline, offlineRequests } = get();
    
    if (isOffline) {
      // Going Online -> Sync offline requests to backend
      set({ isOffline: false });
      
      if (offlineRequests.length > 0) {
        console.log("Syncing offline requests...", offlineRequests);
        for (const req of offlineRequests) {
          try {
            await axios.post(`${API_URL}/send_sos`, req);
          } catch (e) {
            console.error("Failed to sync request", req, e);
          }
        }
        set({ offlineRequests: [] });
        alert(`Successfully synced ${offlineRequests.length} offline requests to the Mesh Network!`);
      }
    } else {
      // Going Offline
      set({ isOffline: true });
      alert("Mesh Network Offline Mode Activated. Data will sync when back online.");
    }
  },

  cacheOfflineRequest: (requestPayload) => {
    set((state) => ({
      offlineRequests: [...state.offlineRequests, requestPayload]
    }));
  }
}));
