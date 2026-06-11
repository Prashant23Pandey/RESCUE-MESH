import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export default function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [resources, setResources] = useState([]);

  const fetchData = async () => {
    try {
      const [reqRes, resRes] = await Promise.all([
        axios.get(`${API_URL}/get_requests`),
        axios.get(`${API_URL}/resources`)
      ]);
      setRequests(reqRes.data.data || []);
      setResources(resRes.data.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Auto refresh
    return () => clearInterval(interval);
  }, []);

  const handleAssign = async (requestId) => {
    try {
      await axios.post(`${API_URL}/assign_resource`, { requestId });
      fetchData();
    } catch (err) {
      alert("Error assigning resource: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Command Dashboard</h2>
      
      <div className="flex gap-4 mb-4" style={{ alignItems: 'flex-start' }}>
        
        <div style={{ flex: 2 }}>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Active SOS Requests</h3>
            {requests.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No active requests.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Severity</th>
                    <th>Area</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(req => (
                    <tr key={req.id}>
                      <td>
                        <span className={`badge ${req.severityLabel}`}>
                          {req.severityLabel.toUpperCase()} ({req.priorityScore})
                        </span>
                      </td>
                      <td>{req.location.area}</td>
                      <td>{req.message}</td>
                      <td>
                        {req.status === 'pending' ? (
                          <span style={{ color: 'var(--text-secondary)' }}>Pending</span>
                        ) : (
                          <span style={{ color: 'var(--low)' }}>Assigned</span>
                        )}
                      </td>
                      <td>
                        {req.status === 'pending' && (
                          <button onClick={() => handleAssign(req.id)} style={{ padding: '6px 12px', fontSize: '13px' }}>
                            Auto-Assign
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Resource Pool</h3>
            {resources.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No resources available.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {resources.map(res => (
                  <div key={res.id} style={{ 
                    padding: '10px', 
                    backgroundColor: 'var(--bg-dark)', 
                    borderLeft: `4px solid ${res.available ? 'var(--low)' : 'var(--text-secondary)'}`,
                    borderRadius: '4px'
                  }}>
                    <div style={{ fontWeight: 'bold' }}>{res.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Type: {res.type} | Area: {res.area}</div>
                    <div style={{ fontSize: '12px', marginTop: '5px', color: res.available ? 'var(--low)' : 'var(--text-secondary)' }}>
                      {res.available ? '🟢 Available' : '⚪ Dispatched'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
