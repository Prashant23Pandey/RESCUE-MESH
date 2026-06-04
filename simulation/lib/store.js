// simulation/lib/store.js
import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { haversineDist } from './utils';

const DEFAULT_CENTER = { lat: 37.7749, lon: -122.4194 }; // San Francisco

export const useAppStore = create((set, get) => ({
  online: true, // true = Global Internet Connected, false = Offline Mesh Mode
  nodes: [], // { id, type: 'victim'|'responder', lat, lon }

  toggleNetwork: () => set(state => ({ online: !state.online })),

  addNode: (type) => {
    const { lat, lon } = DEFAULT_CENTER;
    const offset = 0.01; // ~1km random spread
    const newNode = {
      id: uuidv4(),
      type,
      lat: lat + (Math.random() * 2 - 1) * offset,
      lon: lon + (Math.random() * 2 - 1) * offset,
    };
    set(state => ({ nodes: [...state.nodes, newNode] }));
  },

  // Compute peer‑to‑peer links when offline mesh mode is active
  computeLinks: () => {
    const { nodes, online } = get();
    const links = [];
    if (online) return links; // no mesh links when online
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dist = haversineDist(a.lat, a.lon, b.lat, b.lon);
        if (dist <= 500) {
          links.push({ fromId: a.id, toId: b.id, from: a, to: b, distance: Math.round(dist) });
        }
      }
    }
    return links;
  },
}));
