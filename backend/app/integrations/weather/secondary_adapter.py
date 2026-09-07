import asyncio
from datetime import datetime, timedelta
from typing import List
from .base import WeatherProvider, WeatherDataSchema, LocationSchema, CurrentWeatherSchema, ForecastDaySchema, HourlyForecastSchema, WeatherMetadataSchema

class SecondaryWeatherProvider(WeatherProvider):
    def __init__(self, api_key: str = None):
        self.api_key = api_key

    async def search_locations(self, query: str) -> List[LocationSchema]:
        # Mocked for MVP / Demo Mode
        # In a real implementation, this would call a Geocoding API
        mock_locations = [
            LocationSchema(latitude=23.2599, longitude=77.4126, city="Bhopal", state="Madhya Pradesh", country="India"),
            LocationSchema(latitude=22.7196, longitude=75.8577, city="Indore", state="Madhya Pradesh", country="India"),
            LocationSchema(latitude=23.6500, longitude=77.3300, city="Vidisha", state="Madhya Pradesh", country="India"),
        ]
        return [loc for loc in mock_locations if query.lower() in loc.city.lower()]

    async def get_weather(self, lat: float, lon: float) -> WeatherDataSchema:
        # Mocked for MVP / Demo Mode
        # In a real implementation, this would call an API like OpenWeatherMap

        # Determine city for mock data
        city = "Unknown"
        if lat == 23.2599 and lon == 77.4126: city = "Bhopal"
        elif lat == 22.7196 and lon == 75.8577: city = "Indore"
        elif lat == 23.6500 and lon == 77.3300: city = "Vidisha"

        now = datetime.utcnow()

        return WeatherDataSchema(
            location=LocationSchema(latitude=lat, longitude=lon, city=city, state="Madhya Pradesh", country="India"),
            current=CurrentWeatherSchema(
                temperature_c=29.0,
                feels_like_c=31.0,
                humidity_percent=68,
                wind_speed_kmh=14.0,
                condition="Partly Cloudy",
                precipitation_probability=30
            ),
            forecast=[
                ForecastDaySchema(
                    date=(now + timedelta(days=i)).strftime("%Y-%m-%d"),
                    temperature_high_c=30.0 + i,
                    temperature_low_c=22.0 + i,
                    condition="Partly Cloudy" if i % 2 == 0 else "Rainy",
                    rain_probability_percent=20 + (i * 10),
                    rainfall_mm=2.0 * i
                ) for i in range(7)
            ],
            hourly=[
                HourlyForecastSchema(
                    time=f"{i}:00",
                    temperature_c=28.0 + (i % 5),
                    condition="Cloudy" if i < 12 else "Clear",
                    rain_probability_percent=10 + (i * 2),
                    wind_speed_kmh=12.0 + (i % 3)
                ) for i in range(24)
            ],
            metadata=WeatherMetadataSchema(
                source="WeatherGPT Demo Provider",
                observed_at=now.isoformat(),
                forecast_generated_at=now.isoformat(),
                retrieved_at=now.isoformat(),
                data_quality="Demo Data"
            )
        )
