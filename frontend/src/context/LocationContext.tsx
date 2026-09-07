import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Location } from '../types/weather';

interface LocationContextType {
  location: Location | null;
  setLocation: (location: Location) => void;
  clearLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);

  const clearLocation = () => setLocation(null);

  return (
    <LocationContext.Provider value={{ location, setLocation, clearLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
