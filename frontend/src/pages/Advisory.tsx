import React, { useState, useEffect } from 'react';
import { useLocation } from '../context/LocationContext';
import api from '../services/api';
import { Sprout, Car, Info, Loader2, AlertTriangle } from 'lucide-react';

interface AdvisoryData {
  mode: string;
  advisories: string[];
  risk: any;
  answer: string;
}

const ADVISORY_MODES = [
  { id: 'GENERAL', label: 'General', icon: Info },
  { id: 'AGRICULTURE', label: 'Agriculture', icon: Sprout },
  { id: 'TRAVEL', label: 'Travel', icon: Car },
];

const Advisory: React.FC = () => {
  const { location } = useLocation();
  const [mode, setMode] = useState('GENERAL');
  const [data, setData] = useState<AdvisoryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAdvisory = async () => {
      if (!location) return;
      setIsLoading(true);
      try {
        const response = await api.get('/advisory', {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
            city: location.city,
            mode: mode,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching advisory:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvisory();
  }, [location, mode]);

  if (!location) return (
    <div className="flex items-center justify-center min-h-[80vh] text-slate-400">
      Please select a location first.
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Intelligence Advisory</h1>
          <p className="text-slate-400 mt-1">Actionable guidance based on real-time weather data.</p>
        </div>
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          {ADVISORY_MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === m.id ? 'bg-weather-accent text-weather-primary shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <m.icon className="h-3 w-3" />
              {m.label}
            </button>
          ))}
        </div>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-weather-accent" />
          <p className="text-slate-400 animate-pulse">Analyzing meteorological patterns...</p>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-weather-accent" />
                <h3 className="text-lg font-bold text-white">AI Recommendation</h3>
              </div>
              <p className="text-slate-200 leading-relaxed text-lg">{data.answer}</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 shadow-xl">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Key Guidelines</h3>
              <div className="grid grid-cols-1 gap-3">
                {data.advisories.map((adv, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-700">
                    <div className="mt-1 h-2 w-2 rounded-full bg-weather-accent shrink-0" />
                    <p className="text-sm text-slate-300">{adv}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 shadow-xl">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Risk Profile</h3>
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <div className={`p-4 rounded-full ${
                  data.risk?.overall_level === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                  data.risk?.overall_level === 'MODERATE' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  <AlertTriangle className="h-12 w-12" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{data.risk?.overall_level || 'LOW'}</p>
                  <p className="text-xs text-slate-400">{data.risk?.reason || 'No significant risks'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[40vh] text-slate-500 italic">
          No advisory data available for this location.
        </div>
      )}
    </div>
  );
};

export default Advisory;
