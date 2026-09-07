import os
from typing import List
from ..integrations.weather.base import WeatherProvider, WeatherDataSchema, LocationSchema
from ..integrations.weather.secondary_adapter import SecondaryWeatherProvider
from .cache_service import cache_service

class WeatherService:
    def __init__(self):
        # In production, this would be determined by environment variables
        # and could switch between IMD and Secondary providers
        self.provider: WeatherProvider = SecondaryWeatherProvider(api_key=os.getenv("WEATHER_API_KEY"))

    async def get_current_weather(self, lat: float, lon: float) -> WeatherDataSchema:
        cache_key = f"weather:{lat}:{lon}"
        cached_data = cache_service.get(cache_key)
        if cached_data:
            return WeatherDataSchema(**cached_data)

        weather_data = await self.provider.get_weather(lat, lon)
        cache_service.set(cache_key, weather_data.dict(), ex=1800) # Cache for 30 mins
        return weather_data

    async def search_locations(self, query: str) -> List[LocationSchema]:
        # Geocoding results are cached longer
        cache_key = f"loc_search:{query.lower()}"
        cached_data = cache_service.get(cache_key)
        if cached_data:
            return [LocationSchema(**loc) for loc in cached_data]

        locations = await self.provider.search_locations(query)
        cache_service.set(cache_key, [loc.dict() for loc in locations], ex=86400) # Cache for 24 hours
        return locations

# Singleton instance
weather_service = WeatherService()
