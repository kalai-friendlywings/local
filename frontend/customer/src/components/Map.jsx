import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl  } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with React Leaflet
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new L.Icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapUpdater({ center }) {
  const map = useMap();
  map.setView(center, 15);
  return null;
}

function MapPage() {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState([20.5937, 78.9629]); // Default center: India

  const searchLocation = async () => {
    if (!query) return;

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: query,
          format: 'json',
          addressdetails: 1,
          limit: 5,
        },
      });

      const results = response.data.map((loc) => ({
        lat: parseFloat(loc.lat),
        lon: parseFloat(loc.lon),
        display_name: loc.display_name,
      }));

      setLocations(results);

      if (results.length > 0) {
        setCenter([results[0].lat, results[0].lon]);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Search bar */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Search for shop name or shop name + pincode"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px 12px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={searchLocation} style={{ padding: '8px 16px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Search
        </button>
      </div>

      {/* Map */}
     <MapContainer
  center={center}
  zoom={5}
  style={{ height: '100%', width: '100%' }}
  zoomControl={false} // remove default zoom control
>
  <ZoomControl position="bottomleft" /> {/* ⬅ This places it at bottom left */}

  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  />
  {locations.map((loc, idx) => (
    <Marker key={idx} position={[loc.lat, loc.lon]} icon={defaultIcon}>
      <Popup>{loc.display_name}</Popup>
    </Marker>
  ))}
  <MapUpdater center={center} />
</MapContainer>

    </div>
  );
}

export default MapPage;
