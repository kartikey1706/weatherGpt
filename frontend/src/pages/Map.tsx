import React from 'react';
import { useLocation } from '../context/LocationContext';
import WeatherMap from '../components/map/WeatherMap';
import LocationSearch from '../components/common/LocationSearch';

const MapPage = () => {
  const { location } = useLocation();

  return (
    <div className="h-screen flex flex-col p-4 gap-4">
      <header className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Weather Intelligence Map</h1>
          <p className="text-slate-400 text-sm">Visualize localized weather patterns and official alerts</p>
        </div>
        <LocationSearch />
      </header>
      <main className="flex-1 relative">
        <WeatherMap location={location} />
      </main>
    </div>
  );
};

export default MapPage;
