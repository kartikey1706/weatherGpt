from typing import List, Dict, Any
from .risk_engine import RiskLevel

class AdvisoryEngine:
    def generate_advisory(self, risk_data: Dict[str, Any], weather_data: Any, mode: str = "GENERAL") -> List[str]:
        advisories = []
        overall_level = risk_data["overall_level"]

        if overall_level == RiskLevel.LOW:
            return ["Weather conditions are stable. No special precautions needed."]

        # Agriculture Mode
        if mode == "AGRICULTURE":
            for risk in risk_data["risks"]:
                if risk["type"] == "RAIN":
                    if risk["level"] == RiskLevel.EXTREME:
                        advisories.append("Severe rainfall expected. Protect crops from waterlogging and avoid field entries.")
                    elif risk["level"] == RiskLevel.HIGH:
                        advisories.append("Heavy rain expected. Postpone pesticide spraying and irrigation.")
                    elif risk["level"] == RiskLevel.MODERATE:
                        advisories.append("Moderate rain expected. Plan field activities around the rainfall window.")

                if risk["type"] == "HEAT":
                    advisories.append("High heat detected. Increase irrigation frequency and monitor soil moisture.")

        # Travel Mode
        elif mode == "TRAVEL":
            for risk in risk_data["risks"]:
                if risk["type"] == "RAIN" and risk["level"] in [RiskLevel.HIGH, RiskLevel.EXTREME]:
                    advisories.append("Potential travel delays due to heavy rain. Check road conditions before leaving.")
                if risk["type"] == "WIND" and risk["level"] in [RiskLevel.HIGH, RiskLevel.EXTREME]:
                    advisories.append("High wind warnings. Be cautious of flying debris and unstable structures.")

        # General Mode
        else:
            if overall_level == RiskLevel.EXTREME:
                advisories.append("Extreme weather warning. Stay indoors and follow official safety guidelines.")
            elif overall_level == RiskLevel.HIGH:
                advisories.append("High risk weather. Exercise caution during outdoor activities.")
            else:
                advisories.append("Moderate weather risks detected. Stay updated with latest forecasts.")

        return advisories if advisories else ["No specific advisory available for the current conditions."]

advisory_engine = AdvisoryEngine()
