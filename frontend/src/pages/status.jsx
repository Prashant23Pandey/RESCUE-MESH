import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export default function StatusCheck() {
  const [requestId, setRequestId] = useState('');
  const [requestData, setRequestData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      
      if (found) {
        setRequestData(found);
      } else {
        setError("No SOS request found with that ID.");
      }
    } catch (err) {
      setError("Error checking status: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>Check SOS Status</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Enter your Request ID to see if help is on the way.</p>

      <form onSubmit={handleCheck} className="flex gap-4" style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={requestId} 
          onChange={(e) => setRequestId(e.target.value)} 
          placeholder="Enter Request ID (e.g. req_12345)" 
          required 
          style={{ flex: 1 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Check Status'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'var(--critical)', padding: '10px', backgroundColor: 'rgba(248, 81, 73, 0.1)', borderRadius: '6px' }}>
          {error}
        </div>
      )}

      {requestData && (
        <div style={{ padding: '20px', backgroundColor: 'var(--bg-dark)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginTop: 0, display: 'flex', justifyContent: 'space-between' }}>
            Status: 
            <span style={{ color: requestData.status === 'assigned' ? 'var(--low)' : 'var(--high)' }}>
              {requestData.status.toUpperCase()}
            </span>
          </h3>
          
          <div style={{ margin: '15px 0' }}>
            <strong>Severity:</strong> <span className={`badge ${requestData.severityLabel}`}>{requestData.severityLabel.toUpperCase()}</span>
          </div>
          
          <div style={{ margin: '10px 0' }}>
            <strong>Message:</strong> {requestData.message}
          </div>
          <div style={{ margin: '10px 0' }}>
            <strong>Location:</strong> {requestData.location?.area}
          </div>

          {requestData.status === 'assigned' && (
            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'rgba(63, 185, 80, 0.1)', border: '1px solid var(--low)', borderRadius: '6px' }}>
              <strong>✅ A resource has been assigned to your location and is on the way.</strong>
            </div>
          )}
          {requestData.status === 'pending' && (
            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'rgba(210, 153, 34, 0.1)', border: '1px solid var(--high)', borderRadius: '6px' }}>
              <strong>⏳ Your request is in the queue. Responders will assign resources shortly.</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
