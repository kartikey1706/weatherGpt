from typing import List
from ..integrations.alerts.official_alert_adapter import OfficialAlertProvider, AlertSchema

class AlertService:
    def __init__(self):
        self.provider = OfficialAlertProvider()

    async def get_alerts_for_location(self, location_name: str) -> List[AlertSchema]:
        return await self.provider.get_alerts_for_location(location_name)

# Singleton instance
alert_service = AlertService()
