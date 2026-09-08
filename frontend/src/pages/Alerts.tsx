import React, { useState, useEffect } from 'react';
import { useLocation } from '../context/LocationContext';
import api from '../services/api';
import { AlertTriangle, Bell, Loader2, Calendar, MapPin } from 'lucide-react';

interface OfficialAlert {
  hazard: string;
  severity: string;
  location_name: string;
  issued_at: string;
  valid_from: string;
  valid_until: string;
  source: string;
  description: string;
  is_active: boolean;
}

const SEVERITY_COLORS = {
  EXTREME: 'bg-red-600 text-white',
  HIGH: 'bg-red-400 text-white',
  MODERATE: 'bg-yellow-500 text-black',
  LOW: 'bg-green-500 text-white',
};

const Alerts: React.FC = () => {
  const { location } = useLocation();
  const [alerts, setAlerts] = useState<OfficialAlert[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!location) return;
      setIsLoading(true);
      try {
        const response = await api.get('/alerts/location', {
          params: {
            city: location.city,
          },
        });
        setAlerts(response.data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, [location]);

  if (!location) return (
    <div className="flex items-center justify-center min-h-[80vh] text-slate-400">
      Please select a location first.
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-red-500/20 text-red-500">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Official Alerts</h1>
            <p className="text-slate-400 mt-1">Real-time warnings from official meteorological agencies.</p>
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-weather-accent" />
          <p className="text-slate-400 animate-pulse">Scanning official channels...</p>
        </div>
      ) : alerts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {alerts.map((alert, i) => (
            <div key={i} className="relative p-6 rounded-3xl bg-slate-800 border border-slate-700 shadow-xl overflow-hidden group">
              <div className={`absolute left-0 top-0 bottom-0 w-2 ${
                alert.severity === 'EXTREME' ? 'bg-red-600' :
                alert.severity === 'HIGH' ? 'bg-red-400' :
                alert.severity === 'MODERATE' ? 'bg-yellow-500' : 'bg-green-500'
              }`} />

              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`h-6 w-6 ${
                    alert.severity === 'EXTREME' ? 'text-red-600' :
                    alert.severity === 'HIGH' ? 'text-red-400' :
                    alert.severity === 'MODERATE' ? 'text-yellow-500' : 'text-green-500'
                  }`} />
                  <h3 className="text-xl font-bold text-white">{alert.hazard}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  SEVERITY_COLORS[alert.severity as keyof typeof SEVERITY_COLORS] || 'bg-slate-600 text-white'
                }`}>
                  {alert.severity}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="h-4 w-4" />
                    <span>{alert.location_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(alert.valid_from).toLocaleString()} — {new Date(alert.valid_until).toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Source: {alert.source}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-700">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {alert.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-4">
          <div className="p-6 rounded-full bg-green-500/10 text-green-500">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">No Active Alerts</h3>
            <p className="text-slate-400 mt-1">Your area is currently clear of official warnings.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Add CheckCircle2 import for the empty state
import { CheckCircle2 } from 'lucide-react';

export default Alerts;
