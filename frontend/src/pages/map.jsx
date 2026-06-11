import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

// Dynamically import Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px', fontSize: '13px' }}>Initializing Map Interface...</p>
});

const API_URL = 'http://localhost:4000';
const socket = io(API_URL);

export default function MapView() {
  // Author: Benadic - State to hold geospatial requests
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Author: Benadic - Fetch initial data from backend API
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${API_URL}/get_requests`);
        setRequests(res.data.data || []);
      } catch (err) {
        console.error("Error fetching map data:", err);
      }
    };
    fetchRequests();

    socket.on("sos_created", (newSos) => {
      setRequests(prev => [newSos, ...prev]);
    });

    socket.on("resource_assigned", () => {
      fetchRequests();
    });

    return () => {
      socket.off("sos_created");
      socket.off("resource_assigned");
    };
  }, []);

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const assignedCount = requests.filter(r => r.status === 'assigned').length;

  // Author: Benadic - Rendering map interface with statistics
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>Geospatial View</h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Live Emergency Map</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ padding: '4px 10px', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
            <span style={{ color: 'var(--high)', marginRight: '4px' }}>■</span> {pendingCount} Pending
          </div>
          <div style={{ padding: '4px 10px', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
            <span style={{ color: 'var(--low)', marginRight: '4px' }}>■</span> {assignedCount} Dispatched
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <MapComponent requests={requests} />
      </div>
    </div>
  );
}
