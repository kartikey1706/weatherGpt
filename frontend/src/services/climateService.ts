import api from './api';

export interface ClimateTrend {
  month: string;
  avg_temp: number;
  avg_rain: number;
}

export interface ClimateData {
  location: {
    lat: number;
    lon: number;
  };
  temperature_trends: { month: string; avg_temp: number }[];
  rainfall_trends: { month: string; avg_rain: number }[];
  metadata: {
    period: string;
    source: string;
    retrieved_at: string;
  };
}

export const climateService = {
  async getHistory(lat: number, lon: number): Promise<ClimateData> {
    const response = await api.get(`/climate/history`, {
      params: { lat, lon },
    });
    return response.data;
  },
};
