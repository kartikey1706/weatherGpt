import React from 'react';
import { CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { WeatherData } from '../../types/weather';

interface DecisionForecastProps {
  data: WeatherData;
}

const DecisionForecastCard: React.FC<DecisionForecastProps> = ({ data }) => {
  const hourly = data.hourly || [];

  // Find hours with comfortable temperature and low rain probability.
  const bestSlots = hourly.filter(
    h =>
      h.temperature_c >= 18 &&
      h.temperature_c <= 28 &&
      h.rain_probability_percent < 20
  );

  // Find hours with heavy rain or extreme temperatures.
  const risks = hourly.filter(
    h =>
      h.rain_probability_percent > 50 ||
      h.temperature_c > 38 ||
      h.temperature_c < 5
  );

  const window =
    bestSlots.length > 0
      ? {
          start: bestSlots[0].time,
          end: bestSlots[bestSlots.length - 1].time,
        }
      : null;

  return (
    <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Decision Guide</h3>
        <Clock className="h-5 w-5 text-slate-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Best outdoor window */}
        <div
          className={`p-4 rounded-2xl border ${
            window
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-slate-700/30 border-slate-600'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2
              className={`h-4 w-4 ${
                window ? 'text-green-400' : 'text-slate-500'
              }`}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Best Outdoor Window
            </span>
          </div>

          {window ? (
            <div className="text-white">
              <p className="text-lg font-semibold">
                {window.start} — {window.end}
              </p>
              <p className="text-xs text-slate-400">
                Ideal conditions for outdoor activities
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">
              No optimal window found today
            </p>
          )}
        </div>

        {/* High-risk periods */}
        <div
          className={`p-4 rounded-2xl border ${
            risks.length > 0
              ? 'bg-red-500/10 border-red-500/30'
              : 'bg-slate-700/30 border-slate-600'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle
              className={`h-4 w-4 ${
                risks.length > 0 ? 'text-red-400' : 'text-slate-500'
              }`}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              High Risk Periods
            </span>
          </div>

          {risks.length > 0 ? (
            <div className="text-white">
              <p className="text-lg font-semibold">
                {risks[0].time} onward
              </p>
              <p className="text-xs text-slate-400">
                Potential rain or extreme temperature
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">
              No significant risks detected
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DecisionForecastCard;