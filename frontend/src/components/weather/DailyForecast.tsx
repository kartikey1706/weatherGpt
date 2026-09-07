import React from 'react';
import { ForecastDay } from '../../types/weather';

interface DailyForecastProps {
  forecast: ForecastDay[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecast }) => {
  return (
    <div className="space-y-3">
      {forecast.map((day, index) => (
        <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-weather-secondary border border-slate-700">
          <div className="w-1/4 font-medium">{day.date}</div>
          <div className="w-1/4 text-center text-slate-400 text-sm">{day.condition}</div>
          <div className="w-1/4 text-center font-bold">
            <span>{day.temperature_high_c}°</span>
            <span className="mx-2 text-slate-500 font-normal">{day.temperature_low_c}°</span>
          </div>
          <div className="w-1/4 text-right text-sky-400 text-sm font-medium">
            💧 {day.rain_probability_percent}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;
