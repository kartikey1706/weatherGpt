import api from './api';
import { WeatherData, Location } from '../types/weather';

export const weatherService = {
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    const response = await api.get(`/weather/current`, {
      params: { lat, lon },
    });
    return response.data;
  },

  async getForecast(lat: number, lon: number): Promise<WeatherData> {
    const response = await api.get(`/weather/daily`, {
      params: { lat, lon },
    });
    return response.data;
  },

  async searchLocation(query: string): Promise<Location[]> {
    const response = await api.get(`/location/search`, {
      params: { q: query },
    });
    return response.data;
  },
};
