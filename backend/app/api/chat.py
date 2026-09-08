from fastapi import APIRouter, Body
from typing import Dict, Any, Optional
from ..services.chat_service import chat_service
from ..integrations.weather.base import LocationSchema

router = APIRouter()

@router.post("/chat")
async def chat(
    message: str = Body(..., embed=True),
    session_id: Optional[int] = Body(None, embed=True),
    location: Optional[LocationSchema] = Body(None)
) -> Dict[str, Any]:
    return await chat_service.process_message(message, location, session_id)
