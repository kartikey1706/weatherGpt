from typing import Dict, Any, List
from ..integrations.weather.base import CurrentWeatherSchema, ForecastDaySchema, HourlyForecastSchema

class InsightEngine:
    def generate_insight(self, current: CurrentWeatherSchema, hourly: List[HourlyForecastSchema], daily: List[ForecastDaySchema]) -> Dict[str, Any]:
        """
        Generates a concise, actionable AI insight based on raw weather data.
        """
        insights = []

        # 1. Precipitation Insight
        # Check for rain in the next 6 hours
        rain_window = [h for h in hourly[:6] if h.rain_probability_percent > 40]
        if rain_window:
            first_rain = rain_window[0].time
            insights.append(f"Rain expected around {first_rain}. Outdoor plans are better before then.")
        elif any(d.rain_probability_percent > 60 for d in daily[:3]):
            insights.append("Rain likely in the coming days. Keep an umbrella handy.")
        else:
            insights.append("Clear skies ahead. Great time for outdoor activities.")

        # 2. Temperature Insight
        if current.temperature_c > 38:
            insights.append("Extreme heat detected. Stay hydrated and avoid direct sunlight between 12 PM and 4 PM.")
        elif current.temperature_c < 15:
            insights.append("Chilly weather. Heavy clothing is recommended for morning and evening.")

        # 3. Wind Insight
        if current.wind_speed_kmh > 30:
            insights.append("Strong winds detected. Be cautious of unstable structures or loose objects.")

        # 4. UV/Sun Insight
        if current.uv_index and current.uv_index > 6:
            insights.append("High UV index. Use sunscreen and wear protective clothing.")

        # Selection: Pick the most urgent insight or combine top 2
        # Priority: Rain > Heat/Cold > Wind > UV

        # If we have multiple, we'll return the most critical one for the 'Hero' insight
        # but keep others for a detailed list.

        primary_insight = insights[0] if insights else "Weather is stable. No critical actions needed."

        return {
            "primary": primary_insight,
            "all_insights": insights,
            "urgency": "HIGH" if "Rain" in primary_insight or "Extreme" in primary_insight else "LOW"
        }

insight_engine = InsightEngine()
