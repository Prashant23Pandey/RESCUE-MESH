/* Authors: BENADIC90, Member 1, Member 2, Member 3 */
// Team note: This is the main Command Dashboard for dispatchers.
import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const API_URL = 'http://localhost:4000';
const socket = io(API_URL);

export default function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedResources, setSelectedResources] = useState({});

  // Team note: Fetches latest SOS requests and resource states from the backend
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
    
    socket.on("sos_created", (newSos) => {
      setRequests(prev => [newSos, ...prev].sort((a, b) => b.priorityScore - a.priorityScore));
    });

    socket.on("resource_assigned", (assignment) => {
      fetchData(); // Simplest way to refresh both requests and resources
    });

    return () => {
      socket.off("sos_created");
      socket.off("resource_assigned");
    };
  }, []);

  // Team note: Submits selected resources for dispatch. Empty array triggers backend Auto-Assign.
  const handleAssign = async (requestId) => {
    try {
      const resourceIds = selectedResources[requestId] || [];
      await axios.post(`${API_URL}/assign_resource`, { 
        requestId, 
        ...(resourceIds.length > 0 && { resourceIds })
      });
      fetchData();
      // Clear selection after dispatch
      setSelectedResources(prev => ({ ...prev, [requestId]: [] }));
    } catch (err) {
      alert("Error assigning resource: " + (err.response?.data?.error || err.message));
    }
  };

  const toggleResource = (reqId, resId) => {
    setSelectedResources(prev => {
      const current = prev[reqId] || [];
      if (current.includes(resId)) {
        return { ...prev, [reqId]: current.filter(id => id !== resId) };
      } else {
        return { ...prev, [reqId]: [...current, resId] };
      }
    });
  };

  const resourceStats = resources.reduce((acc, res) => {
    if (!acc[res.type]) acc[res.type] = { total: 0, available: 0, dispatched: 0 };
    acc[res.type].total++;
    if (res.available) acc[res.type].available++;
    else acc[res.type].dispatched++;
    return acc;
  }, {});

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
                    <th>Message & AI Summary</th>
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
                      <td>
                        <div>{req.message}</div>
                        {req.aiSummary && (
                          <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--high)', fontStyle: 'italic' }}>
                            🤖 {req.aiSummary}
                          </div>
                        )}
                        {req.neededResources && req.neededResources.length > 0 && (
                          <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                            <strong>Requested:</strong> {req.neededResources.join(', ')}
                          </div>
                        )}
                      </td>
                      <td>
                        {req.status === 'pending' ? (
                          <span style={{ color: 'var(--text-secondary)' }}>Pending</span>
                        ) : (
                          <span style={{ color: 'var(--low)' }}>Assigned</span>
                        )}
                      </td>
                      <td>
                        {req.status === 'pending' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <div style={{ maxHeight: '100px', overflowY: 'auto', border: '1px solid var(--border-color)', padding: '5px', borderRadius: '4px', background: 'var(--bg-dark)' }}>
                              {resources.filter(r => r.available).length === 0 && <span style={{fontSize: '12px', color:'gray'}}>No units available</span>}
                              {resources.filter(r => r.available).map(r => (
                                <label key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', marginBottom: '4px' }}>
                                  <input 
                                    type="checkbox" 
                                    checked={(selectedResources[req.id] || []).includes(r.id)}
                                    onChange={() => toggleResource(req.id, r.id)}
                                  />
                                  <span>{r.name}</span>
                                </label>
                              ))}
                            </div>
                            <button onClick={() => handleAssign(req.id)} style={{ padding: '6px 12px', fontSize: '13px' }}>
                              Dispatch Selected ({selectedResources[req.id]?.length || 0})
                            </button>
                            {(!selectedResources[req.id] || selectedResources[req.id].length === 0) && (
                              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                (Leave empty to Auto-Assign)
                              </div>
                            )}
                          </div>
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
            
            {/* Fleet Statistics Widget */}
            <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>Fleet Statistics</h4>
              {Object.keys(resourceStats).length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>No statistics available.</div>
              ) : (
                <div style={{ display: 'grid', gap: '8px' }}>
                  {Object.entries(resourceStats).map(([type, stats]) => (
                    <div key={type} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                      <strong style={{ textTransform: 'capitalize' }}>{type.replace('_', ' ')}</strong>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        Total: {stats.total} | <span style={{ color: 'var(--low)' }}>Avail: {stats.available}</span> | Dispatched: {stats.dispatched}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
