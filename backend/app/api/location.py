from fastapi import APIRouter, Query
from typing import List
from ..services.weather_service import weather_service
from ..integrations.weather.base import LocationSchema

router = APIRouter()

@router.get("/search", response_model=List[LocationSchema])
async def search_location(q: str = Query(..., description="Location search query")):
    return await weather_service.search_locations(q)
