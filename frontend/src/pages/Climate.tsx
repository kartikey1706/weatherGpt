import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLocation } from '../context/LocationContext';
import { climateService, ClimateData } from '../services/climateService';
import LocationSearch from '../components/common/LocationSearch';
import { Clock, Database } from 'lucide-react';

const Climate: React.FC = () => {
  const { location } = useLocation();

  const { data, isLoading, error } = useQuery<ClimateData>({
    queryKey: ['climate', location?.latitude, location?.longitude],
    queryFn: () => climateService.getHistory(location?.latitude || 0, location?.longitude || 0),
    enabled: !!location,
  });

  if (!location) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center">
        <h1 className="text-3xl font-bold text-weather-accent mb-4">Climate Analytics</h1>
        <p className="text-slate-400 mb-8 max-w-md">Please select a location to view historical climate trends and averages.</p>
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
        Error loading climate data. Please try again.
      </div>
    );
  }

  if (!data) return null;

  // Merge temp and rain data for the charts
  const chartData = data.temperature_trends.map((t, i) => ({
    month: t.month,
    temp: t.avg_temp,
    rain: data.rainfall_trends[i]?.avg_rain || 0,
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Climate Analytics: {location.city}</h1>
          <div className="flex items-center gap-4 mt-2 text-slate-400 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Period: {data.metadata.period}</span>
            </div>
            <div className="flex items-center gap-1">
              <Database className="h-4 w-4" />
              <span>Source: {data.metadata.source}</span>
            </div>
          </div>
        </div>
        <LocationSearch />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="p-6 rounded-3xl bg-weather-secondary border border-slate-700 space-y-6">
          <h2 className="text-xl font-semibold text-slate-300">Temperature Trends (°C)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }}
                  itemStyle={{ color: '#38bdf8' }}
                />
                <Legend />
                <Line type="monotone" dataKey="temp" stroke="#38bdf8" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} name="Avg Temp" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="p-6 rounded-3xl bg-weather-secondary border border-slate-700 space-y-6">
          <h2 className="text-xl font-semibold text-slate-300">Rainfall Trends (mm)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }}
                  itemStyle={{ color: '#38bdf8' }}
                />
                <Legend />
                <Bar dataKey="rain" fill="#38bdf8" radius={[4, 4, 0, 0]} name="Avg Rainfall" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Climate;
