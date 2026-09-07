import React from 'react';
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun } from 'lucide-react';
import { CurrentWeather } from '../../types/weather';

interface CurrentConditionsProps {
  weather: CurrentWeather;
}

const CurrentConditions: React.FC<CurrentConditionsProps> = ({ weather }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 rounded-2xl bg-weather-secondary border border-slate-700 flex items-center gap-4">
        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
          <Thermometer className="h-6 w-6" />
        </div>
        <div>
          <div className="text-slate-400 text-xs uppercase tracking-wider">Temperature</div>
          <div className="text-2xl font-bold">{weather.temperature_c}°C</div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-weather-secondary border border-slate-700 flex items-center gap-4">
        <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400">
          <Droplets className="h-6 w-6" />
        </div>
        <div>
          <div className="text-slate-400 text-xs uppercase tracking-wider">Humidity</div>
          <div className="text-2xl font-bold">{weather.humidity_percent}%</div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-weather-secondary border border-slate-700 flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
          <Wind className="h-6 w-6" />
        </div>
        <div>
          <div className="text-slate-400 text-xs uppercase tracking-wider">Wind Speed</div>
          <div className="text-2xl font-bold">{weather.wind_speed_kmh} km/h</div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-weather-secondary border border-slate-700 flex items-center gap-4">
        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
          <Sun className="h-6 w-6" />
        </div>
        <div>
          <div className="text-slate-400 text-xs uppercase tracking-wider">Condition</div>
          <div className="text-lg font-medium truncate">{weather.condition}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentConditions;
