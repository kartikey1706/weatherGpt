import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  MessageSquare,
  Map as MapIcon,
  Bell,
  Lightbulb,
  BarChart3,
  Settings,
  MapPin,
  Languages,
  Sun
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const NavItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
      active
        ? 'bg-weather-accent text-weather-primary font-medium'
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="hidden md:block">{label}</span>
  </Link>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-weather-primary text-white flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-weather-secondary border-r border-slate-800 flex-col p-4">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-10 h-10 bg-weather-accent rounded-xl flex items-center justify-center text-weather-primary font-bold text-xl">
            W
          </div>
          <h1 className="text-xl font-bold tracking-tight">WeatherGPT</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem to="/" icon={Home} label={t('nav.home')} active={location.pathname === '/'} />
          <NavItem to="/dashboard" icon={LayoutDashboard} label={t('nav.dashboard')} active={location.pathname === '/dashboard'} />
          <NavItem to="/chat" icon={MessageSquare} label={t('nav.chat')} active={location.pathname === '/chat'} />
          <NavItem to="/map" icon={MapIcon} label={t('nav.map')} active={location.pathname === '/map'} />
          <NavItem to="/alerts" icon={Bell} label={t('nav.alerts')} active={location.pathname === '/alerts'} />
          <NavItem to="/advisory" icon={Lightbulb} label={t('nav.advisory')} active={location.pathname === '/advisory'} />
          <NavItem to="/climate" icon={BarChart3} label={t('nav.climate')} active={location.pathname === '/climate'} />
        </nav>

        <div className="mt-auto space-y-1 border-t border-slate-800 pt-4">
          <NavItem to="/settings" icon={Settings} label={t('nav.settings')} active={location.pathname === '/settings'} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 md:px-8 bg-weather-secondary/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin size={18} className="text-weather-accent" />
            <span className="text-sm font-medium">Bhopal, Madhya Pradesh</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Languages size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Sun size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden h-16 bg-weather-secondary border-t border-slate-800 flex items-center justify-around px-2 sticky bottom-0 z-10">
        <Link to="/" className={`p-2 rounded-lg ${location.pathname === '/' ? 'text-weather-accent' : 'text-slate-400'}`}>
          <Home size={24} />
        </Link>
        <Link to="/chat" className={`p-2 rounded-lg ${location.pathname === '/chat' ? 'text-weather-accent' : 'text-slate-400'}`}>
          <MessageSquare size={24} />
        </Link>
        <Link to="/dashboard" className={`p-2 rounded-lg ${location.pathname === '/dashboard' ? 'text-weather-accent' : 'text-slate-400'}`}>
          <LayoutDashboard size={24} />
        </Link>
        <Link to="/alerts" className={`p-2 rounded-lg ${location.pathname === '/alerts' ? 'text-weather-accent' : 'text-slate-400'}`}>
          <Bell size={24} />
        </Link>
        <Link to="/map" className={`p-2 rounded-lg ${location.pathname === '/map' ? 'text-weather-accent' : 'text-slate-400'}`}>
          <MapIcon size={24} />
        </Link>
      </nav>
    </div>
  );
};

export default Layout;
