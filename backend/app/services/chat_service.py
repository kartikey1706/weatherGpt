from typing import Dict, Any
from .ai_service import ai_service
from .weather_service import weather_service
from .alert_service import alert_service
from ..integrations.weather.base import LocationSchema
from ..intelligence.validation_engine import ValidationEngine
from ..intelligence.risk_engine import risk_engine
from ..intelligence.advisory_engine import advisory_engine

class ChatService:
    def __init__(self):
        self.validator = ValidationEngine()

    async def process_message(self, message: str, current_location: LocationSchema = None) -> Dict[str, Any]:
        trace = []

        # 1. Intent Extraction
        trace.append("Analyzing intent...")
        intent_data = await ai_service.get_intent(message)
        trace.append(f"Intent detected: {intent_data.get('intent')}")

        # 2. Location Resolution
        trace.append("Resolving location...")
        location = current_location
        if intent_data.get("location"):
            locations = await weather_service.search_locations(intent_data["location"])
            if locations:
                location = locations[0]
        trace.append(f"Location set to: {location.city if location else 'Global'}")

        # 3. Weather Retrieval (if location found)
        weather_data = None
        if location:
            trace.append("Retrieving trusted weather data...")
            weather_data = await weather_service.get_current_weather(location.latitude, location.longitude)
            trace.append("Weather data successfully retrieved.")
        else:
            trace.append("No location provided; skipping weather retrieval.")

        # 4. Official Alert Retrieval
        official_alerts = []
        if location:
            trace.append("Checking official meteorological warnings...")
            official_alerts = await alert_service.get_alerts_for_location(location.city)
            trace.append(f"Found {len(official_alerts)} official alert(s).")

        # 5. Risk & Advisory Calculation
        risk_info = None
        advisories = []
        if weather_data:
            trace.append("Running deterministic risk engine...")
            risk_info = risk_engine.calculate_risk(weather_data.current, weather_data.forecast)

            # Determine advisory mode based on intent
            mode = "GENERAL"
            if intent_data.get("intent") == "AGRICULTURE_ADVISORY":
                mode = "AGRICULTURE"
            elif intent_data.get("intent") == "TRAVEL_ADVISORY":
                mode = "TRAVEL"

            trace.append(f"Generating {mode} advisory...")
            advisories = advisory_engine.generate_advisory(risk_info, weather_data, mode)

        # 6. Grounded Response Generation
        trace.append("Generating grounded AI response...")
        system_prompt = (
            "You are WeatherGPT, a grounded weather intelligence assistant. "
            "You MUST use only the weather facts supplied in the structured weather context. "
            "Never invent or estimate a meteorological value that is not provided. "
            "Clearly distinguish: observation, forecast, official warning, AI advisory."
        )

        context = f"User Location: {location.city if location else 'Unknown'}\n"
        if weather_data:
            context += f"Current Weather: {weather_data.current}\nForecast: {weather_data.forecast}\n"
            context += f"Risk Level: {risk_info['overall_level']}\nRisks: {risk_info['reason']}\n"
            context += f"Advisories: {', '.join(advisories)}\n"
        else:
            context += "No reliable weather data available for this location.\n"

        if official_alerts:
            context += f"Official Alerts: {official_alerts}\n"
        else:
            context += "No active official warnings available.\n"

        prompt = f"Context:\n{context}\n\nUser Question: {message}"

        # Attempt response generation with validation
        max_retries = 2
        answer = ""
        for attempt in range(max_retries):
            answer = await ai_service.generate_response(prompt, system_prompt)
            trace.append(f"Validating response (Attempt {attempt + 1})...")
            is_valid, error_msg = self.validator.validate_response(answer, weather_data)
            if is_valid:
                trace.append("Response validated as grounded.")
                break
            if attempt == max_retries - 1:
                answer = "I'm sorry, I tried to generate a response but it contained unreliable data. Please try asking again or check the dashboard for facts."
                trace.append("Validation failed after max retries. Falling back to safety response.")

        return {
            "answer": answer,
            "intent": intent_data.get("intent"),
            "location": location,
            "weather": weather_data,
            "risk": risk_info,
            "advisories": advisories,
            "alerts": official_alerts,
            "language": intent_data.get("language", "en"),
            "trace": trace
        }

# Singleton instance
chat_service = ChatService()
