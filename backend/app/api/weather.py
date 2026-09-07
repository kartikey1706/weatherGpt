from fastapi import APIRouter, Query
from ..services.weather_service import weather_service
from ..integrations.weather.base import WeatherDataSchema

router = APIRouter()

@router.get("/current", response_model=WeatherDataSchema)
async def get_current_weather(
    lat: float = Query(..., description="Latitude of the location"),
    lon: float = Query(..., description="Longitude of the location")
):
    return await weather_service.get_current_weather(lat, lon)

@router.get("/daily", response_model=WeatherDataSchema)
async def get_daily_forecast(
    lat: float = Query(..., description="Latitude of the location"),
    lon: float = Query(..., description="Longitude of the location")
):
    return await weather_service.get_current_weather(lat, lon) # In MVP, return same as current for simplicity
