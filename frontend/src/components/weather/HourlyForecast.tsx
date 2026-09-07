import React from 'react';
import { HourlyForecast } from '../../types/weather';

interface HourlyForecastProps {
  forecast: HourlyForecast[];
}

const HourlyForecastComponent: React.FC<HourlyForecastProps> = ({ forecast }) => {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {forecast.map((hour, index) => (
          <div key={index} className="flex flex-col items-center p-4 rounded-2xl bg-weather-secondary border border-slate-700 min-w-[100px]">
            <div className="text-slate-400 text-sm mb-2">{hour.time}</div>
            <div className="text-xl font-bold mb-1">{hour.temperature_c}°</div>
            <div className="text-xs text-slate-400 text-center h-8 flex items-center">{hour.condition}</div>
            <div className="mt-2 text-xs text-sky-400 font-medium">💧 {hour.rain_probability_percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecastComponent;
