import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Location } from '../types/weather';

interface LocationContextType {
  location: Location | null;
  setLocation: (location: Location) => void;
  clearLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocationState] = useState<Location | null>(() => {
    const savedLocation = localStorage.getItem('weathergpt_location');
    return savedLocation ? JSON.parse(savedLocation) : null;
  });

  const setLocation = (newLocation: Location) => {
    localStorage.setItem('weathergpt_location', JSON.stringify(newLocation));
    setLocationState(newLocation);
  };

  const clearLocation = () => {
    localStorage.removeItem('weathergpt_location');
    setLocationState(null);
  };

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
