import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from '../context/LocationContext';
import { weatherService } from '../services/weatherService';
import { WeatherData } from '../types/weather';
import CurrentConditions from '../components/weather/CurrentConditions';
import HourlyForecast from '../components/weather/HourlyForecast';
import DailyForecast from '../components/weather/DailyForecast';
import LocationSearch from '../components/common/LocationSearch';
import AIWeatherInsightCard from '../components/dashboard/AIWeatherInsightCard';
import DecisionForecastCard from '../components/dashboard/DecisionForecast';
import Skeleton from '../components/common/Skeleton';
import WeatherMap from '../components/map/WeatherMap';
import { Clock, Database, Umbrella, Car, Sprout, Footprints, Plane, CloudRain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QUICK_ACTIONS = [
  { label: 'Umbrella?', icon: Umbrella, prompt: 'Should I carry an umbrella today?' },
  { label: 'Safe Travel?', icon: Car, prompt: 'Is it safe to travel to my destination now?' },
  { label: 'Farming Advice', icon: Sprout, prompt: 'Give me specific farming advice based on the current weather.' },
  { label: 'Outdoor Activity', icon: Footprints, prompt: 'Is it a good time for outdoor activities?' },
  { label: 'Flight Weather', icon: Plane, prompt: 'How is the weather for flights today?' },
  { label: 'Rain Stop?', icon: CloudRain, prompt: 'When will the rain stop in my area?' },
];

const Dashboard: React.FC = () => {
  const { location } = useLocation();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<WeatherData>({
    queryKey: ['weather', location?.latitude, location?.longitude],
    queryFn: () => weatherService.getCurrentWeather(location?.latitude || 0, location?.longitude || 0),
    enabled: !!location,
  });

  const handleQuickAction = (prompt: string) => {
    // Pass prompt via state to the Chat page
    navigate('/chat', { state: { initialPrompt: prompt } });
  };

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
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-10 w-64 rounded-full" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-40 w-full" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-8 w-24 rounded-full" />)}
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700 space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700 space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700 space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700">
            <Skeleton className="h-full w-full min-h-[400px]" />
          </div>
        </div>
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
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{data.location.city}, {data.location.state}</h1>
          <div className="flex items-center gap-4 text-slate-400 text-xs md:text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Updated {new Date(data.metadata.retrieved_at).toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Database className="h-3 w-3" />
              <span>Source: {data.metadata.source}</span>
            </div>
          </div>
        </div>
        <LocationSearch />
      </header>

      {/* Intelligence Layer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AIWeatherInsightCard />

          <div className="flex flex-wrap gap-2">
            {QUICK_ACTIONS.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(action.prompt)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium hover:bg-weather-accent hover:text-weather-primary transition-all active:scale-95"
              >
                <action.icon className="h-3 w-3" />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Current Status</h2>
            <CurrentConditions weather={data.current} />
          </section>
        </div>
      </div>

      {/* Forecast & Map Layer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DecisionForecastCard data={data} />
          <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Hourly Intelligence</h2>
            <HourlyForecast forecast={data.hourly || []} />
          </div>

          <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Daily Forecast</h2>
            <DailyForecast forecast={data.forecast} />
          </div>
        </div>

        <div className="space-y-6">
           <div className="h-full min-h-[400px] p-6 rounded-3xl bg-slate-800/50 border border-slate-700">
             <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Weather Intelligence Map</h2>
             <div className="h-[calc(100%-2rem)] w-full">
               <WeatherMap location={location} />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


