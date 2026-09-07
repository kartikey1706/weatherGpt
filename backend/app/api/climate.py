from fastapi import APIRouter, Query
from ..services.climate_service import climate_service

router = APIRouter()

@router.get("/history")
async def get_climate_history(
    lat: float = Query(..., description="Latitude of the location"),
    lon: float = Query(..., description="Longitude of the location")
):
    return await climate_service.get_historical_trends(lat, lon)
