import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon issue with React
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src || iconRetinaUrl,
  iconUrl: iconUrl.src || iconUrl,
  shadowUrl: shadowUrl.src || shadowUrl,
});

export default function MapComponent({ requests }) {
  // Filter out requests without coordinates
  const markers = requests.filter(r => r.location && r.location.lat && r.location.lng);

  // Default to somewhere (San Francisco)
  const defaultCenter = [37.7749, -122.4194]; 

  return (
    <MapContainer 
      center={markers.length > 0 ? [markers[0].location.lat, markers[0].location.lng] : defaultCenter} 
      zoom={10} 
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map(req => (
        <Marker key={req.id} position={[req.location.lat, req.location.lng]}>
          <Popup>
            <strong>{req.severityLabel.toUpperCase()} SOS</strong><br/>
            <em>{req.location.area}</em><br/>
            {req.message}<br/>
            Status: {req.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
