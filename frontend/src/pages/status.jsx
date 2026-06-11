import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export default function StatusCheck() {
  const [requestId, setRequestId] = useState('');
  const [requestData, setRequestData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Author: Benadic - Checking the status of an existing request
  const handleCheck = async (e) => {
    e.preventDefault();
    if (!requestId.trim()) return;

    setError(null);
    setRequestData(null);
    setLoading(true);

    try {
      const res = await axios.get(`${API_URL}/get_requests`);
      const requests = res.data.data || [];
      const found = requests.find(r => r.id === requestId.trim());

      // Author: Benadic - Update state based on search result
      if (found) {
        setRequestData(found);
      } else {
        setError("No SOS request found with that ID.");
      }
    } catch (err) {
      setError("Connection error: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Author: Benadic - Rendering status lookup interface
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '700' }}>Check Request Status</h2>

      <div className="card">
        <form onSubmit={handleCheck} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <input
            type="text"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
            placeholder="Enter Request ID"
            required
            style={{ flex: 1 }}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Checking...' : 'Check Status'}
          </button>
        </form>

        {error && (
          <div style={{ color: 'var(--critical)', padding: '12px', background: 'rgba(229, 83, 75, 0.05)', borderLeft: '3px solid var(--critical)', fontSize: '13px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        {requestData && (
          <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Status</span>
              <span style={{ fontWeight: '700', fontSize: '12px', color: requestData.status === 'assigned' ? 'var(--low)' : 'var(--high)', textTransform: 'uppercase' }}>
                {requestData.status}
              </span>
            </div>

            <div style={{ display: 'grid', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Severity</span>
                <span className={`badge ${requestData.severityLabel}`}>{requestData.severityLabel}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Message</span>
                <span style={{ textAlign: 'right', maxWidth: '70%' }}>{requestData.message}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Location</span>
                <span>{requestData.location?.area}</span>
              </div>
            </div>

            {requestData.status === 'assigned' && (
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(70, 149, 74, 0.05)', borderLeft: '3px solid var(--low)', fontSize: '13px', color: 'var(--text-primary)' }}>
                Resource assigned and dispatched.
              </div>
            )}
            {requestData.status === 'pending' && (
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(210, 153, 34, 0.05)', borderLeft: '3px solid var(--high)', fontSize: '13px', color: 'var(--text-primary)' }}>
                Request queued. Pending dispatch.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
