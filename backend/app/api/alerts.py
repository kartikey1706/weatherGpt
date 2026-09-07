from fastapi import APIRouter, HTTPException, Query
from app.services.alert_service import alert_service
from app.schemas.alerts import OfficialAlert
from typing import List

router = APIRouter()

@router.get("/", response_model=List[OfficialAlert])
async def get_all_alerts():
    try:
        return await alert_service.get_all_alerts()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/location", response_model=List[OfficialAlert])
async def get_alerts_by_location(location: str = Query(...)):
    try:
        return await alert_service.get_alerts_for_location(location)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
