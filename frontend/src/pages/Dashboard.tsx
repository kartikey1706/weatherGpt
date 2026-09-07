import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from '../context/LocationContext';
import { weatherService } from '../services/weatherService';
import { WeatherData } from '../types/weather';
import CurrentConditions from '../components/weather/CurrentConditions';
import HourlyForecast from '../components/weather/HourlyForecast';
import DailyForecast from '../components/weather/DailyForecast';
import LocationSearch from '../components/common/LocationSearch';
import { Clock, Database } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { location } = useLocation();

  const { data, isLoading, error } = useQuery<WeatherData>({
    queryKey: ['weather', location?.latitude, location?.longitude],
    queryFn: () => weatherService.getCurrentWeather(location?.latitude || 0, location?.longitude || 0),
    enabled: !!location,
  });

  if (!location) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center">
        <h1 className="text-3xl font-bold text-weather-accent mb-4">Welcome to WeatherGPT</h1>
        <p className="text-slate-400 mb-8 max-w-md">Please select a location to view the weather intelligence dashboard.</p>
        <LocationSearch />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-weather-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] text-red-400">
        Error loading weather data. Please try again.
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{data.location.city}, {data.location.state}</h1>
          <div className="flex items-center gap-4 mt-2 text-slate-400 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Updated {new Date(data.metadata.retrieved_at).toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Database className="h-4 w-4" />
              <span>Source: {data.metadata.source}</span>
            </div>
          </div>
        </div>
        <LocationSearch />
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-300">Current Conditions</h2>
        <CurrentConditions weather={data.current} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-300">Hourly Forecast</h2>
        <HourlyForecast forecast={data.hourly || []} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-300">Daily Forecast</h2>
        <DailyForecast forecast={data.forecast} />
      </section>
    </div>
  );
};

export default Dashboard;
