import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocationProvider } from './context/LocationContext';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Map from './pages/Map';
import Alerts from './pages/Alerts';
import Advisory from './pages/Advisory';
import Climate from './pages/Climate';
import Settings from './pages/Settings';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <LocationProvider>
          <Router>
            <div className="min-h-screen bg-weather-primary text-white">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/map" element={<Map />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/advisory" element={<Advisory />} />
                <Route path="/climate" element={<Climate />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </Router>
        </LocationProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
