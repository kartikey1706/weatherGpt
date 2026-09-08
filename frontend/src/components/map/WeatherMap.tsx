import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Location } from '../../types/weather';
import { Layers, Info } from 'lucide-react';

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

const MAP_LAYERS = {
  BASE: {
    name: 'Standard',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
  },
  PRECIPITATION: {
    name: 'Rain/Snow',
    url: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_MAP_API_KEY}`,
    attribution: '&copy; OpenWeatherMap',
  },
  TEMPERATURE: {
    name: 'Temperature',
    url: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_MAP_API_KEY}`,
    attribution: '&copy; OpenWeatherMap',
  },
  WIND: {
    name: 'Wind',
    url: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_MAP_API_KEY}`,
    attribution: '&copy; OpenWeatherMap',
  },
  CLOUDS: {
    name: 'Clouds',
    url: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_MAP_API_KEY}`,
    attribution: '&copy; OpenWeatherMap',
  },
};

const MapRecenter: React.FC<{ location: Location }> = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([location.latitude, location.longitude], 10);
  }, [location, map]);
  return null;
};

const WeatherMap: React.FC<WeatherMapProps> = ({ location }) => {
  const [activeLayer, setActiveLayer] = useState<keyof typeof MAP_LAYERS>('BASE');
  const [showLegend, setShowLegend] = useState(false);

  const center: [number, number] = location
    ? [location.latitude, location.longitude]
    : [23.2599, 77.4126]; // Default to Bhopal

  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900">
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution={MAP_LAYERS[activeLayer].attribution}
          url={MAP_LAYERS[activeLayer].url}
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

      {/* Layer Selector */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <div className="bg-slate-800/90 backdrop-blur-md p-2 rounded-2xl border border-slate-700 shadow-lg">
          <div className="flex items-center gap-2 px-2 py-1 mb-2 text-slate-400">
            <Layers className="h-3 w-3" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Layers</span>
          </div>
          <div className="flex flex-col gap-1">
            {Object.entries(MAP_LAYERS).map(([key, layer]) => (
              <button
                key={key}
                onClick={() => setActiveLayer(key as keyof typeof MAP_LAYERS)}
                className={`text-left px-3 py-1.5 rounded-lg text-xs transition-all ${
                  activeLayer === key
                    ? 'bg-weather-accent text-weather-primary font-bold'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                {layer.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Legend Toggle */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <button
          onClick={() => setShowLegend(!showLegend)}
          className="p-2 bg-slate-800/90 backdrop-blur-md rounded-full border border-slate-700 text-slate-400 hover:text-white transition-all"
        >
          <Info className="h-5 w-5" />
        </button>
      </div>

      {showLegend && (
        <div className="absolute bottom-20 right-4 z-[1000] bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-lg w-48">
          <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">Map Legend</h4>
          <div className="space-y-2">
            {activeLayer === 'BASE' ? (
              <p className="text-[10px] text-slate-400">Standard topographic map showing borders and landmarks.</p>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] text-slate-300">
                  <div className="h-2 w-8 bg-blue-500 rounded-full" /> Light Rain
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-300">
                  <div className="h-2 w-8 bg-blue-700 rounded-full" /> Heavy Rain
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-300">
                  <div className="h-2 w-8 bg-red-500 rounded-full" /> Extreme Warning
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherMap;
