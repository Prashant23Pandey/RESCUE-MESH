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

  // Author: Benadic - Fetching active requests and available resources
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

    socket.on("resource_assigned", () => {
      fetchData();
    });

    return () => {
      socket.off("sos_created");
      socket.off("resource_assigned");
    };
  }, []);

  const handleAssign = async (requestId) => {
    // Author: Benadic - Dispatch selected resources or trigger auto-assign
    try {
      const resourceIds = selectedResources[requestId] || [];
      await axios.post(`${API_URL}/assign_resource`, {
        requestId,
        ...(resourceIds.length > 0 && { resourceIds })
      });
      fetchData();
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

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const assignedCount = requests.filter(r => r.status === 'assigned').length;
  const criticalCount = requests.filter(r => r.severityLabel === 'critical').length;

  // Author: Benadic - Rendering the dispatch dashboard UI
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>Command Dashboard</h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Dispatch Control Center</div>
      </div>

      <div className="grid-4" style={{ marginBottom: '20px' }}>
        {[
          { label: 'Total Requests', value: requests.length },
          { label: 'Pending', value: pendingCount },
          { label: 'Dispatched', value: assignedCount },
          { label: 'Critical', value: criticalCount }
        ].map((stat, i) => (
          <div key={i} className="card" style={{ padding: '16px', marginBottom: 0 }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 dashboard-layout" style={{ alignItems: 'flex-start' }}>
        <div className="dashboard-main" style={{ flex: 2 }}>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '15px' }}>Active SOS Requests</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', background: 'var(--bg-dark)', padding: '2px 8px', borderRadius: '4px' }}>
                {requests.length} records
              </span>
            </div>

            {requests.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', background: 'var(--bg-dark)', borderRadius: 'var(--radius)' }}>
                No active requests.
              </div>
            ) : (
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Severity</th>
                      <th>Area</th>
                      <th>Message & Analysis</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr key={req.id}>
                        <td>
                          <span className={`badge ${req.severityLabel}`}>
                            {req.severityLabel.toUpperCase()} ({req.priorityScore})
                          </span>
                        </td>
                        <td style={{ fontWeight: '500' }}>{req.location.area}</td>
                        <td>
                          <div style={{ marginBottom: '4px' }}>{req.message}</div>
                          {req.aiSummary && (
                            <div style={{ fontSize: '12px', color: 'var(--accent)', background: 'rgba(68, 147, 248, 0.1)', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '4px' }}>
                              AI: {req.aiSummary}
                            </div>
                          )}
                          {req.neededResources && req.neededResources.length > 0 && (
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                              {req.neededResources.map(r => (
                                <span key={r} style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                                  {r}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td>
                          {req.status === 'pending' ? (
                            <span style={{ color: 'var(--high)', fontWeight: '600', fontSize: '12px' }}>PENDING</span>
                          ) : (
                            <span style={{ color: 'var(--low)', fontWeight: '600', fontSize: '12px' }}>ASSIGNED</span>
                          )}
                        </td>
                        <td>
                          {req.status === 'pending' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ maxHeight: '100px', overflowY: 'auto', border: '1px solid var(--border-color)', padding: '6px', borderRadius: '4px', background: 'var(--bg-dark)' }}>
                                {resources.filter(r => r.available).length === 0 && (
                                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>No units</span>
                                )}
                                {resources.filter(r => r.available).map(r => (
                                  <label key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginBottom: '4px', cursor: 'pointer' }}>
                                    <input
                                      type="checkbox"
                                      checked={(selectedResources[req.id] || []).includes(r.id)}
                                      onChange={() => toggleResource(req.id, r.id)}
                                    />
                                    <span style={{ color: 'var(--text-primary)', fontWeight: '400' }}>{r.name}</span>
                                  </label>
                                ))}
                              </div>
                              <button onClick={() => handleAssign(req.id)} style={{ padding: '6px 12px', fontSize: '12px' }}>
                                Dispatch ({selectedResources[req.id]?.length || 0})
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-sidebar" style={{ flex: 1, minWidth: '280px' }}>
          <div className="card" style={{ position: 'sticky', top: '70px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Resource Pool
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', background: 'var(--bg-dark)', padding: '2px 8px', borderRadius: '4px', fontWeight: '500' }}>
                {resources.filter(r => r.available).length}/{resources.length} free
              </span>
            </h3>

            {Object.keys(resourceStats).length > 0 && (
              <div style={{ marginBottom: '16px', padding: '12px', background: 'var(--bg-dark)', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', fontWeight: '600' }}>Fleet Status</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {Object.entries(resourceStats).map(([type, stats]) => (
                    <div key={type} style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(45, 51, 59, 0.5)', paddingBottom: '4px' }}>
                      <span style={{ textTransform: 'capitalize' }}>{type.replace('_', ' ')}</span>
                      <span style={{ color: 'var(--low)', fontWeight: '600' }}>{stats.available}/{stats.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resources.length === 0 ? (
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>No resources.</div>
            ) : (
              <div className="grid-2" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {resources.map(res => (
                  <div key={res.id} style={{
                    padding: '8px',
                    background: 'var(--bg-dark)',
                    borderLeft: `3px solid ${res.available ? 'var(--low)' : 'var(--border-color)'}`,
                    borderRadius: '4px'
                  }}>
                    <div style={{ fontWeight: '600', fontSize: '12px', marginBottom: '2px' }}>{res.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {res.available ? 'Ready' : 'Out'}
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
