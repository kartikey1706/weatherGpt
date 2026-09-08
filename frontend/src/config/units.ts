export const WEATHER_UNITS = {
  temperature: 'Celsius',
  windSpeed: 'km/h',
  precipitation: 'mm',
  pressure: 'hPa',
} as const;

export const INDIAN_AQI_CATEGORIES = {
  GOOD: { min: 0, max: 50, label: 'Good', color: '#00E400' },
  SATISFACTORY: { min: 51, max: 100, label: 'Satisfactory', color: '#FFFF00' },
  MODERATE: { min: 101, max: 200, label: 'Moderate', color: '#FFA500' },
  POOR: { min: 201, max: 300, label: 'Poor', color: '#FF0000' },
  VERY_POOR: { min: 301, max: 400, label: 'Very Poor', color: '#8F3F97' },
  SEVERE: { min: 401, max: 500, label: 'Severe', color: '#7E0023' },
} as const;

export const DEFAULT_TIME_FORMAT = '12h';
