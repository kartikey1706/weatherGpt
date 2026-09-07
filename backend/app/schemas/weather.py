from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Location(BaseModel):
    latitude: float
    longitude: float
    city: str
    district: Optional[str] = None
    state: str
    country: str

class CurrentWeather(BaseModel):
    temperature_c: float
    feels_like_c: float
    humidity_percent: int
    wind_speed_kmh: float
    condition: str
    visibility_km: Optional[float] = None
    pressure_hpa: Optional[int] = None
    uv_index: Optional[float] = None
    precipitation_probability: Optional[int] = None

class ForecastItem(BaseModel):
    date: str
    time: Optional[str] = None
    temperature_high_c: Optional[float] = None
    temperature_low_c: Optional[float] = None
    temperature_c: Optional[float] = None
    condition: str
    rain_probability_percent: int
    rainfall_mm: Optional[float] = None
    wind_speed_kmh: float

class WeatherResponse(BaseModel):
    location: Location
    current: CurrentWeather
    forecast: List[ForecastItem]
    metadata: dict = Field(default_factory=lambda: {
        "source": "Demo Provider",
        "observed_at": datetime.now().isoformat(),
        "retrieved_at": datetime.now().isoformat(),
        "data_quality": "demo"
    })
