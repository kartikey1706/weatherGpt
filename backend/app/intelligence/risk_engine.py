from typing import Dict, Any, Optional
from ..integrations.weather.base import CurrentWeatherSchema, ForecastDaySchema

class RiskLevel:
    LOW = "LOW"
    MODERATE = "MODERATE"
    HIGH = "HIGH"
    EXTREME = "EXTREME"

class RiskEngine:
    def calculate_risk(self, current: CurrentWeatherSchema, forecast: list[ForecastDaySchema]) -> Dict[str, Any]:
        risks = []

        # Temperature Risk
        if current.temperature_c > 45:
            risks.append({"type": "HEAT", "level": RiskLevel.EXTREME, "reason": "Extreme heat detected."})
        elif current.temperature_c > 40:
            risks.append({"type": "HEAT", "level": RiskLevel.HIGH, "reason": "Severe heat detected."})
        elif current.temperature_c > 35:
            risks.append({"type": "HEAT", "level": RiskLevel.MODERATE, "reason": "High temperature."})

        # Wind Risk
        if current.wind_speed_kmh > 70:
            risks.append({"type": "WIND", "level": RiskLevel.EXTREME, "reason": "Dangerous wind speeds."})
        elif current.wind_speed_kmh > 40:
            risks.append({"type": "WIND", "level": RiskLevel.MODERATE, "reason": "Strong winds detected."})

        # Rain Risk (checking current and immediate forecast)
        max_rain = 0
        if forecast:
            max_rain = max([day.rainfall_mm or 0 for day in forecast[:3]])

        if max_rain > 100:
            risks.append({"type": "RAIN", "level": RiskLevel.EXTREME, "reason": "Extreme rainfall expected."})
        elif max_rain > 50:
            risks.append({"type": "RAIN", "level": RiskLevel.HIGH, "reason": "Heavy rainfall expected."})
        elif max_rain > 10:
            risks.append({"type": "RAIN", "level": RiskLevel.MODERATE, "reason": "Moderate rainfall expected."})

        if not risks:
            return {"overall_level": RiskLevel.LOW, "risks": [], "reason": "No significant weather risks detected."}

        # Overall level is the highest risk level found
        level_map = {RiskLevel.LOW: 0, RiskLevel.MODERATE: 1, RiskLevel.HIGH: 2, RiskLevel.EXTREME: 3}
        overall_level = max(risks, key=lambda x: level_map[x["level"]])["level"]

        return {
            "overall_level": overall_level,
            "risks": risks,
            "reason": "; ".join([r["reason"] for r in risks])
        }

risk_engine = RiskEngine()
