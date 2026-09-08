import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import api from '../../services/api';

interface AIInsight {
  insight: string;
  location: any;
  risk: any;
  trace: string[];
}

const AIWeatherInsightCard: React.FC = () => {
  const { location } = useLocation();
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsight = async () => {
      if (!location) return;

      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get('/ai/insight', {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
            city: location.city,
          },
        });
        setInsight(response.data);
      } catch (err) {
        console.error('Failed to fetch AI insight:', err);
        setError('Could not generate AI insight. Please check your connection.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsight();
  }, [location]);

  if (!location) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-weather-accent/20 to-slate-800 border border-weather-accent/30 p-6 shadow-xl transition-all hover:shadow-weather-accent/10">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-weather-accent/10 blur-3xl" />

      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-weather-accent text-weather-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">AI Weather Insight</h3>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-3 text-slate-400 animate-pulse">
          <Loader2 className="h-5 w-5 animate-spin text-weather-accent" />
          <span className="text-sm font-medium">Consulting meteorological models...</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm">{error}</span>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg text-slate-100 leading-relaxed font-medium">
            {insight?.insight || "Analyzing weather patterns for your location..."}
          </p>

          {insight?.risk && (
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                insight.risk.overall_level === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                insight.risk.overall_level === 'MODERATE' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {insight.risk.overall_level} RISK
              </span>
              <span className="text-xs text-slate-400 italic">
                {insight.risk.reason}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIWeatherInsightCard;
