from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Dict, Any
from ...services.chat_service import chat_service
from ...integrations.weather.base import LocationSchema
from ...database.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("/advisory")
async def get_advisory(
    location: LocationSchema = Depends(),
    mode: str = Query("GENERAL", enum=["GENERAL", "AGRICULTURE", "TRAVEL"]),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    try:
        # We reuse the chat_service process_message logic but specifically for advisories
        # We use a prompt that asks the AI to act as an advisor in the given mode
        prompt = f"Provide detailed advisory for the current location in {mode} mode."

        result = await chat_service.process_message(
            message=prompt,
            current_location=location
        )

        return {
            "mode": mode,
            "advisories": result["advisories"],
            "risk": result["risk"],
            "answer": result["answer"],
            "location": result["location"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
