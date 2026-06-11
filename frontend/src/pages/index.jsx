import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export default function SosForm() {
  const [formData, setFormData] = useState({
    reporterName: '', contactNumber: '', area: '', lat: '', lng: '', message: '', peopleCount: 1, neededResources: []
  });
  const [isLocating, setIsLocating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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
      (position) => {
        setFormData(prev => ({
          ...prev,
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6)
        }));
        setIsLocating(false);
      },
      (err) => {
        alert("Unable to retrieve your location. Please ensure location permissions are granted.");
        setIsLocating(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const payload = {
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

    try {
      const res = await axios.post(`${API_URL}/send_sos`, payload);
      setResult(res.data.data);
      setFormData({
        reporterName: '', contactNumber: '', area: '', lat: '', lng: '', message: '', peopleCount: 1, neededResources: []
      });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>Submit SOS Request</h2>
      
      {result && (
        <div className="card" style={{ borderColor: 'var(--low)', backgroundColor: 'rgba(63, 185, 80, 0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--low)' }}>Successfully Submitted!</h3>
          <p style={{ margin: 0 }}>Severity: <span className={`badge ${result.severityLabel}`}>{result.severityLabel.toUpperCase()}</span></p>
          <p style={{ margin: '5px 0 0 0' }}>Priority Score: {result.priorityScore}</p>
        </div>
      )}

      {error && (
        <div className="card" style={{ borderColor: 'var(--critical)', backgroundColor: 'rgba(248, 81, 73, 0.1)' }}>
          <p style={{ margin: 0, color: 'var(--critical)' }}>Error: {error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Emergency Message *</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required rows="3" placeholder="Describe the emergency..." />
        </div>

        <div className="form-group">
          <label>Area / Location *</label>
          <input type="text" name="area" value={formData.area} onChange={handleChange} required placeholder="e.g. Sector 7" />
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button type="button" onClick={handleGetLocation} disabled={isLocating} style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            {isLocating ? '📍 Locating...' : '📍 Auto-detect My Exact Location'}
          </button>
          {(formData.lat && formData.lng) && (
            <span style={{ color: 'var(--low)', fontSize: '14px', fontWeight: 'bold' }}>
              ✓ GPS Coordinates Captured
            </span>
          )}
        </div>

        <div className="flex gap-4">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Number of People</label>
            <input type="number" min="1" name="peopleCount" value={formData.peopleCount} onChange={handleChange} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Needed Resources</label>
            <div className="checkbox-group">
              {resourcesList.map(res => {
                const isSelected = formData.neededResources.includes(res.id);
                return (
                  <label key={res.id} className={`checkbox-label ${isSelected ? 'selected' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => handleCheckboxChange(res.id)}
                    />
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

        <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Submit SOS Signal</button>
      </form>
    </div>
  );
}
