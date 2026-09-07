import pytest
import asyncio
from app.services.weather_service import WeatherService
from app.integrations.weather.secondary_adapter import SecondaryWeatherProvider

@pytest.mark.asyncio
async def test_weather_retrieval():
    service = WeatherService()
    # Coordinates for Bhopal
    data = await service.get_current_weather(23.2599, 77.4126)

    assert data.location.city == "Bhopal"
    assert data.current.temperature_c == 29.0
    assert len(data.forecast) == 7

@pytest.mark.asyncio
async def test_location_search():
    service = WeatherService()
    results = await service.search_locations("Bhopal")

    assert len(results) > 0
    assert results[0].city == "Bhopal"
