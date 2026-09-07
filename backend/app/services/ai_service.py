import os
from typing import Any, Dict
from ..integrations.ai.base import AIProvider
from ..integrations.ai.gemini_provider import GeminiProvider
from ..intelligence.intent_engine import IntentEngine

class AIService:
    def __init__(self):
        # Provider selection based on env var
        provider_type = os.getenv("AI_PROVIDER", "gemini")
        if provider_type == "gemini":
            self.provider = GeminiProvider()
        else:
            # Default to Gemini for MVP
            self.provider = GeminiProvider()

        self.intent_engine = IntentEngine(self.provider)

    async def get_intent(self, query: str) -> Dict[str, Any]:
        return await self.intent_engine.extract_intent(query)

    async def generate_response(self, prompt: str, system_prompt: str) -> str:
        return await self.provider.generate_text(prompt, system_prompt)

# Singleton instance
ai_service = AIService()
