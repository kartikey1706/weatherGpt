from abc import ABC, abstractmethod
from typing import Any, Dict, Optional
from pydantic import BaseModel

class AIResponse(BaseModel):
    answer: str
    intent: Optional[str] = None
    location_query: Optional[str] = None
    date_query: Optional[str] = None
    language: str = "en"
    confidence: float = 1.0

class AIProvider(ABC):
    @abstractmethod
    async def generate_text(self, prompt: str, system_prompt: str) -> str:
        pass

    @abstractmethod
    async def extract_structured_data(self, prompt: str, system_prompt: str, schema: Any) -> Dict[str, Any]:
        pass
