/* Authors: BENADIC90, Member 1, Member 2, Member 3 */
// Team note: This component handles the interactive map and live Dijkstra routing lines
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

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

// A simulated Base Station where responders are dispatched from
const BASE_STATION = [28.6139, 77.2090]; // New Delhi, India




// Team note: Custom hook component to intercept the map instance and draw routes
function RoutingControls({ markers }) {
  const map = useMap();

  useEffect(() => {
    // Clear previous routes (hacky but works for live updates)
    map.eachLayer((layer) => {
      if (layer.options && layer.options.route) {
        map.removeLayer(layer);
      }
    });

    // Find assigned markers to draw routes to
    const assigned = markers.filter(m => m.status === 'assigned');
    
    assigned.forEach(marker => {
      L.Routing.control({
        waypoints: [
          L.latLng(BASE_STATION[0], BASE_STATION[1]),
          L.latLng(marker.location.lat, marker.location.lng)
        ],
        lineOptions: {
          styles: [{ color: '#3fb950', opacity: 0.8, weight: 4 }],
          route: true // Custom flag to help clear it later
        },
        createMarker: () => null, // Don't draw extra markers
        show: false, // Hide the turn-by-turn instructions box
        addWaypoints: false,
        fitSelectedRoutes: false
      }).addTo(map);
    });
  }, [map, markers]);

  return null;
}

export default function MapComponent({ requests, height = '600px' }) {
  // Filter out requests without coordinates
  const markers = requests.filter(r => r.location && r.location.lat && r.location.lng);

  // Default to India
  const defaultCenter = [28.6139, 77.2090]; 

  // Restrict map to India boundaries as requested
  const indiaBounds = [
    [6.7535, 68.1623], // South West
    [37.5042, 97.3955] // North East
  ];

  return (
    <MapContainer 
      center={markers.length > 0 ? [markers[0].location.lat, markers[0].location.lng] : defaultCenter} 
      zoom={markers.length > 0 ? 10 : 5} 
      minZoom={4}
      maxBounds={indiaBounds}
      maxBoundsViscosity={1.0}
      style={{ height: height, width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <RoutingControls markers={markers} />
      {markers.map(req => {
        const isPreview = req.id === 'preview';
        return (
        <Marker 
          key={req.id} 
          position={[req.location.lat, req.location.lng]} 
          icon={isPreview ? new L.Icon.Default() : createCustomIcon(req.severityLabel)}
        >
          <Popup>
            {isPreview ? (
              <>
                <strong>{req.message}</strong><br/>
                <em>{req.location.area}</em>
              </>
            ) : (
              <>
                <strong style={{ color: req.severityLabel === 'critical' ? 'var(--critical)' : 'inherit' }}>
                  {req.severityLabel.toUpperCase()} SOS
                </strong><br/>
                <em>{req.location.area}</em><br/>
                {req.message}<br/>
                <div style={{ marginTop: '5px', fontWeight: 'bold', color: req.status === 'assigned' ? 'var(--low)' : 'var(--text-secondary)' }}>
                  Status: {req.status === 'assigned' ? '🟢 DISPATCHED' : '⚪ PENDING'}
                </div>
              </>
            )}
          </Popup>
        </Marker>
      )})}
    </MapContainer>
  );
}
