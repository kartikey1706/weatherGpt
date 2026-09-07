import api from './api';
import { OfficialAlert } from '../types/alerts'; // I need to create this type first

export const alertService = {
  async getAllAlerts(): Promise<OfficialAlert[]> {
    const response = await api.get('/alerts');
    return response.data;
  },

  async getAlertsByLocation(location: string): Promise<OfficialAlert[]> {
    const response = await api.get(`/alerts/location?location=${location}`);
    return response.data;
  },
};
