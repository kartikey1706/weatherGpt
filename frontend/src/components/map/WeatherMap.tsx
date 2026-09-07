import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Location } from '../../types/weather';

// Fix for default leaflet icons in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface WeatherMapProps {
  location: Location | null;
}

const MapRecenter: React.FC<{ location: Location }> = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([location.latitude, location.longitude], 10);
  }, [location, map]);
  return null;
};

import { useEffect } from 'react';

const WeatherMap: React.FC<WeatherMapProps> = ({ location }) => {
  const center: [number, number] = location
    ? [location.latitude, location.longitude]
    : [23.2599, 77.4126]; // Default to Bhopal

  return (
    <div className="h-full w-full rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location && (
          <>
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>
                <div className="text-slate-900 font-medium">
                  {location.city}, {location.state}
                </div>
              </Popup>
            </Marker>
            <MapRecenter location={location} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
