import pytest
import asyncio
from app.intelligence.intent_engine import IntentEngine
from app.integrations.ai.gemini_provider import GeminiProvider

@pytest.mark.asyncio
async def test_intent_extraction():
    # Mock provider to avoid API calls during tests
    class MockAIProvider(GeminiProvider):
        async def extract_structured_data(self, prompt, system_prompt, schema):
            if "Bhopal" in prompt and "rain" in prompt:
                return {"intent": "RAIN_FORECAST", "location": "Bhopal", "language": "hi", "confidence": 0.95}
            return {"intent": "GENERAL_WEATHER", "location": "Unknown", "language": "en", "confidence": 0.5}

    provider = MockAIProvider()
    engine = IntentEngine(provider)

    result = await engine.extract_intent("Kal Bhopal mein rain hogi kya?")
    assert result["intent"] == "RAIN_FORECAST"
    assert result["location"] == "Bhopal"
    assert result["language"] == "hi"
