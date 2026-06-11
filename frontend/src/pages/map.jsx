import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Dynamically import Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

const API_URL = 'http://localhost:4000';

export default function MapView() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${API_URL}/get_requests`);
        setRequests(res.data.data || []);
      } catch (err) {
        console.error("Error fetching map data:", err);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Live Emergency Map</h2>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <MapComponent requests={requests} />
      </div>
    </div>
  );
}
