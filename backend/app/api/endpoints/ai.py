from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any
from ...services.chat_service import chat_service
from ...services.weather_service import weather_service
from ...integrations.weather.base import LocationSchema
from ...database.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("/insight")
async def get_weather_insight(
    location: LocationSchema = Depends(),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    try:
        # We use the existing chat_service to generate a grounded insight
        # We pass a system-defined prompt to get a concise summary
        insight_prompt = (
            "Provide a concise, actionable weather insight for the current location. "
            "Focus on the most important thing the user needs to know for today's decisions. "
            "Limit to 2-3 sentences. Use emojis for visual cues."
        )

        # We reuse process_message but with a specialized prompt
        result = await chat_service.process_message(
            message=insight_prompt,
            current_location=location
        )

        return {
            "insight": result["answer"],
            "location": result["location"],
            "risk": result["risk"],
            "trace": result["trace"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
