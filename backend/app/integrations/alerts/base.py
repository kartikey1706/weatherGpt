from abc import ABC, abstractmethod
from typing import List
from app.schemas.alerts import OfficialAlert

class AlertProvider(ABC):
    @abstractmethod
    async def get_active_alerts(self, location: str = None) -> List[OfficialAlert]:
        """Retrieve all active official warnings, optionally filtered by location."""
        pass
