/* Authors: BENADIC90, Member 1, Member 2, Member 3 */
// Team note: This is the main SOS submission form for victims.
import { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useAppStore } from '../store/appStore';

const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading map...</p>
});

const API_URL = 'http://localhost:4000';

export default function SosForm() {
  // Author: Benadic - Initializing form state
  const [formData, setFormData] = useState({
    reporterName: '', contactNumber: '', area: '', lat: '', lng: '', message: '', peopleCount: 1, neededResources: []
  });
  const [isLocating, setIsLocating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { isOffline, cacheOfflineRequest } = useAppStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resourcesList = [
    { id: 'ambulance', label: 'Ambulance' },
    { id: 'medical_team', label: 'Medical Team' },
    { id: 'fire_team', label: 'Fire Team' },
    { id: 'shelter_unit', label: 'Shelter Unit' },
    { id: 'food_supply', label: 'Food Supply' }
  ];

  const handleCheckboxChange = (id) => {
    // Author: Benadic - Toggle needed resource selection
    setFormData(prev => {
      const isSelected = prev.neededResources.includes(id);
      const updated = isSelected
        ? prev.neededResources.filter(res => res !== id)
        : [...prev.neededResources, id];
      return { ...prev, neededResources: updated };
    });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);

        let areaName = '';
        try {
          const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
          if (res.data && res.data.address) {
            const addr = res.data.address;
            const street = addr.road || addr.suburb || '';
            const city = addr.city || addr.town || addr.village || '';
            const state = addr.state || '';
            const postcode = addr.postcode || '';
            areaName = [street, city, state, postcode].filter(Boolean).join(', ');
          }
        } catch (e) {
          console.error("Geocoding failed:", e);
        }

        setFormData(prev => ({ ...prev, lat, lng, area: areaName || prev.area }));
        setIsLocating(false);
      },
      () => {
        alert("Unable to retrieve your location.");
        setIsLocating(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const payload = {
      // Author: Benadic - Formatting payload for backend transmission
      reporterName: formData.reporterName || undefined,
      contactNumber: formData.contactNumber || undefined,
      location: {
        area: formData.area,
        lat: formData.lat ? parseFloat(formData.lat) : undefined,
        lng: formData.lng ? parseFloat(formData.lng) : undefined
      },
      message: formData.message,
      peopleCount: formData.peopleCount ? parseInt(formData.peopleCount, 10) : undefined,
      neededResources: formData.neededResources.length > 0 ? formData.neededResources : undefined
    };

    if (isOffline) {
      cacheOfflineRequest(payload);
      setResult({ id: 'local_' + Math.random().toString(36).substr(2, 9), status: 'pending', priorityScore: 50, severityLabel: 'CACHED OFFLINE' });
      setFormData({ reporterName: '', contactNumber: '', area: '', lat: '', lng: '', message: '', peopleCount: 1, neededResources: [] });
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/send_sos`, payload);
      setResult(res.data.data);
      setFormData({ reporterName: '', contactNumber: '', area: '', lat: '', lng: '', message: '', peopleCount: 1, neededResources: [] });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '700' }}>Submit SOS Request</h2>

      {result && (
        <div className="card" style={{ borderLeft: '3px solid var(--low)', background: 'rgba(70, 149, 74, 0.05)' }}>
          <div style={{ fontWeight: '600', color: 'var(--low)', marginBottom: '8px' }}>Request Submitted</div>
          <div style={{ fontSize: '13px', marginBottom: '4px' }}>
            ID: <code style={{ background: 'var(--bg-dark)', padding: '2px 6px', borderRadius: '3px', fontSize: '12px' }}>{result.id}</code>
            <button onClick={() => { navigator.clipboard.writeText(result.id); }} style={{ marginLeft: '8px', padding: '2px 8px', fontSize: '11px', background: 'var(--border-color)', color: 'var(--text-primary)' }}>Copy</button>
          </div>
          <div style={{ fontSize: '13px' }}>
            Severity: <span className={`badge ${result.severityLabel}`}>{result.severityLabel.toUpperCase()}</span>
            <span style={{ marginLeft: '12px', color: 'var(--text-secondary)' }}>Score: {result.priorityScore}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="card" style={{ borderLeft: '3px solid var(--critical)', background: 'rgba(229, 83, 75, 0.05)' }}>
          <span style={{ color: 'var(--critical)', fontSize: '13px' }}>Error: {error}</span>
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Emergency Message *</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required rows="3" placeholder="Describe the emergency..." />
          </div>

          <div className="form-group">
            <label>Area / Location *</label>
            <input type="text" name="area" value={formData.area} onChange={handleChange} required placeholder="e.g. Sector 7" />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button type="button" onClick={handleGetLocation} disabled={isLocating} style={{ background: 'var(--border-color)', color: 'var(--text-primary)', fontSize: '12px' }}>
                {isLocating ? 'Locating...' : 'Auto-detect GPS'}
              </button>
              {(formData.lat && formData.lng) && (
                <span style={{ color: 'var(--low)', fontSize: '12px', fontWeight: '600' }}>
                  ✓ {formData.lat}, {formData.lng}
                </span>
              )}
            </div>

            {(formData.lat && formData.lng) && (
              <div style={{ marginTop: '10px', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <MapComponent height="180px" requests={[{ id: 'preview', status: 'pending', severityLabel: 'high', location: { lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) }, message: 'Your location' }]} />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <div className="form-group" style={{ flex: 1 }}>
              <label>People Count</label>
              <input type="number" min="1" name="peopleCount" value={formData.peopleCount} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ flex: 2 }}>
              <label>Needed Resources</label>
              <div className="checkbox-group">
                {resourcesList.map(res => {
                  const isSelected = formData.neededResources.includes(res.id);
                  return (
                    <label key={res.id} className={`checkbox-label ${isSelected ? 'selected' : ''}`}>
                      <input type="checkbox" checked={isSelected} onChange={() => handleCheckboxChange(res.id)} />
                      <span>{res.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="form-group" style={{ flex: 1 }}>
              <label>Reporter Name (optional)</label>
              <input type="text" name="reporterName" value={formData.reporterName} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Contact Number (optional)</label>
              <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" style={{ width: '100%', padding: '10px', fontSize: '14px', background: '#e5534b' }}>
            Submit SOS Signal
          </button>
        </form>
      </div>
    </div>
  );
}
