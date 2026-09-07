from typing import Dict, Any
from ..integrations.ai.base import AIProvider

class IntentEngine:
    def __init__(self, ai_provider: AIProvider):
        self.ai_provider = ai_provider
        self.system_prompt = (
            "You are an intent extraction engine for WeatherGPT. "
            "Your task is to analyze the user's query and extract structured information. "
            "Supported intents: CURRENT_WEATHER, FORECAST, RAIN_FORECAST, TEMPERATURE, WIND, HUMIDITY, "
            "ALERT_QUERY, LIGHTNING_QUERY, TRAVEL_ADVISORY, AGRICULTURE_ADVISORY, OUTDOOR_ACTIVITY, "
            "SAFETY_ADVISORY, CLIMATE_QUERY, LOCATION_QUERY, GENERAL_WEATHER. "
            "Extract the following fields: intent, location, date, time_range, context, language, confidence. "
            "Support Hindi, English, and Hinglish. "
            "Example: 'Kal Bhopal mein rain hogi kya?' -> { 'intent': 'RAIN_FORECAST', 'location': 'Bhopal', 'date': 'tomorrow', 'language': 'hi', 'confidence': 0.95 }"
        )

    async def extract_intent(self, query: str) -> Dict[str, Any]:
        return await self.ai_provider.extract_structured_data(
            query,
            self.system_prompt,
            {
                "intent": "string",
                "location": "string",
                "date": "string",
                "time_range": "string",
                "context": "string",
                "language": "string",
                "confidence": "float"
            }
        )
