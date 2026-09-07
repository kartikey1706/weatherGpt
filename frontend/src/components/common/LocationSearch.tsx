import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { weatherService } from '../../services/weatherService';
import { Location } from '../../types/weather';

const LocationSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { location, setLocation } = useLocation();

  const handleSearch = async (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    if (e.preventDefault) e.preventDefault();

    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const searchResults = await weatherService.searchLocation(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Location search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectLocation = (loc: Location) => {
    setLocation(loc);
    setResults([]);
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search city or location..."
          className="w-full px-4 py-2 pl-10 pr-12 rounded-full bg-weather-secondary border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-weather-accent transition-all"
        />
        <MapPin className="absolute left-3 top-2.5 text-slate-500 h-5 w-5" />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1.5 p-1 bg-weather-accent text-weather-primary rounded-full hover:bg-sky-300 transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-weather-secondary border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
          {results.map((loc, index) => (
            <button
              key={index}
              onClick={() => selectLocation(loc)}
              className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-b-0 flex items-center gap-3"
            >
              <MapPin className="h-4 w-4 text-weather-accent" />
              <div>
                <div className="font-medium">{loc.city}</div>
                <div className="text-xs text-slate-400">{loc.district}, {loc.state}, {loc.country}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {location && !results.length && (
        <div className="mt-3 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
          <MapPin className="h-3 w-3 text-weather-accent" />
          <span>Current: {location.city}, {location.state}</span>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
