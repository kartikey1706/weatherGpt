from abc import ABC, abstractmethod
from typing import List, Optional, Dict, Any
from pydantic import BaseModel

class LocationSchema(BaseModel):
    latitude: float
    longitude: float
    city: str
    district: Optional[str] = None
    state: str
    country: str

class CurrentWeatherSchema(BaseModel):
    temperature_c: float
    feels_like_c: float
    humidity_percent: int
    wind_speed_kmh: float
    condition: str
    visibility_km: Optional[float] = None
    pressure_hpa: Optional[float] = None
    uv_index: Optional[float] = None
    precipitation_probability: Optional[int] = None

class ForecastDaySchema(BaseModel):
    date: str
    temperature_high_c: float
    temperature_low_c: float
    condition: str
    rain_probability_percent: int
    rainfall_mm: Optional[float] = None

class HourlyForecastSchema(BaseModel):
    time: str
    temperature_c: float
    condition: str
    rain_probability_percent: int
    wind_speed_kmh: float

class WeatherMetadataSchema(BaseModel):
    source: str
    observed_at: str
    forecast_generated_at: str
    retrieved_at: str
    data_quality: str

class WeatherDataSchema(BaseModel):
    location: LocationSchema
    current: CurrentWeatherSchema
    forecast: List[ForecastDaySchema]
    hourly: Optional[List[HourlyForecastSchema]] = None
    metadata: WeatherMetadataSchema
    insight: Optional[Dict[str, Any]] = None # NEW: AI-generated actionable insight

class WeatherProvider(ABC):
    @abstractmethod
    async def get_weather(self, lat: float, lon: float) -> WeatherDataSchema:
        pass

    @abstractmethod
    async def search_locations(self, query: str) -> List[LocationSchema]:
        pass
