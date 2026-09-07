from typing import List, Dict, Any
from datetime import datetime, timedelta

class ClimateService:
    async def get_historical_trends(self, lat: float, lon: float):
        # Mocked historical data for the MVP
        # In a real app, this would call a historical weather API (e.g., OpenWeather History)

        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        # Generate some plausible synthetic historical data
        temp_avg = [15, 18, 24, 30, 35, 38, 32, 30, 28, 25, 20, 16]
        rainfall_avg = [10, 15, 5, 2, 1, 1, 150, 250, 180, 20, 10, 5]

        return {
            "location": {"lat": lat, "lon": lon},
            "temperature_trends": [
                {"month": month, "avg_temp": temp}
                for month, temp in zip(months, temp_avg)
            ],
            "rainfall_trends": [
                {"month": month, "avg_rain": rain}
                for month, rain in zip(months, rainfall_avg)
            ],
            "metadata": {
                "period": "Annual Average",
                "source": "Historical Climate Data Provider",
                "retrieved_at": datetime.utcnow().isoformat()
            }
        }

# Singleton instance
climate_service = ClimateService()
