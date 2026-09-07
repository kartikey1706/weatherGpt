export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  district?: string;
  state: string;
  country: string;
}

export interface CurrentWeather {
  temperature_c: number;
  feels_like_c: number;
  humidity_percent: number;
  wind_speed_kmh: number;
  condition: string;
  visibility_km?: number;
  pressure_hpa?: number;
  uv_index?: number;
  precipitation_probability?: number;
}

export interface ForecastDay {
  date: string;
  temperature_high_c: number;
  temperature_low_c: number;
  condition: string;
  rain_probability_percent: number;
  rainfall_mm?: number;
}

export interface HourlyForecast {
  time: string;
  temperature_c: number;
  condition: string;
  rain_probability_percent: number;
  wind_speed_kmh: number;
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast: ForecastDay[];
  hourly?: HourlyForecast[];
  metadata: {
    source: string;
    observed_at: string;
    forecast_generated_at: string;
    retrieved_at: string;
    data_quality: string;
  };
}
