import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, LayoutDashboard, Map as MapIcon, AlertTriangle } from 'lucide-react';
import LocationSearch from '../components/common/LocationSearch';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-12">
      <header className="space-y-6 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
          Ask anything about the <span className="text-weather-accent">weather.</span>
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed">
          Localized forecasts, warnings and actionable weather intelligence — grounded in trusted meteorological data.
        </p>
        <div className="flex justify-center pt-4">
          <LocationSearch />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <QuickActionCard
          icon={<MessageSquare className="h-6 w-6" />}
          title="AI Chat"
          desc="Get contextual advice"
          to="/chat"
          color="bg-blue-500/10 text-blue-400"
        />
        <QuickActionCard
          icon={<LayoutDashboard className="h-6 w-6" />}
          title="Dashboard"
          desc="Detailed forecasts"
          to="/dashboard"
          color="bg-sky-500/10 text-sky-400"
        />
        <QuickActionCard
          icon={<MapIcon className="h-6 w-6" />}
          title="Weather Map"
          desc="Visual intelligence"
          to="/map"
          color="bg-indigo-500/10 text-indigo-400"
        />
        <QuickActionCard
          icon={<AlertTriangle className="h-6 w-6" />}
          title="Alerts"
          desc="Official warnings"
          to="/alerts"
          color="bg-amber-500/10 text-amber-400"
        />
      </div>
    </div>
  );
};

const QuickActionCard = ({ icon, title, desc, to, color }: { icon: React.ReactNode, title: string, desc: string, to: string, color: string }) => (
  <Link to={to} className="group p-6 rounded-3xl bg-weather-secondary border border-slate-700 hover:border-weather-accent transition-all hover:-translate-y-1 text-left">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color}`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm">{desc}</p>
  </Link>
);

export default Home;
