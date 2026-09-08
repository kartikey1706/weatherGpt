from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class AlertSchema(BaseModel):
    hazard: str
    severity: str # LOW, MODERATE, HIGH, EXTREME
    location: str
    issued_at: str
    valid_from: str
    valid_until: str
    source: str
    description: str
    impact: str # NEW: Potential impact on people/property
    recommended_action: str # NEW: What the user should actually do

class OfficialAlertProvider:
    async def get_alerts_for_location(self, location: str) -> List[AlertSchema]:
        # Mocked for MVP / Demo Mode
        # In a real implementation, this would call a government API (like IMD)

        all_alerts = [
            AlertSchema(
                hazard="Heavy Rainfall",
                severity="HIGH",
                location="Bhopal",
                issued_at=datetime.utcnow().isoformat(),
                valid_from=datetime.utcnow().isoformat(),
                valid_until="2026-09-10T00:00:00Z",
                source="IMD (India Meteorological Department)",
                description="Heavy to very heavy rainfall expected in the next 48 hours.",
                impact="Possible urban flooding in low-lying areas and traffic disruptions.",
                recommended_action="Avoid unnecessary travel. Move valuables to higher ground if in a flood-prone area."
            ),
            AlertSchema(
                hazard="Heat Wave",
                severity="MODERATE",
                location="Indore",
                issued_at=datetime.utcnow().isoformat(),
                valid_from=datetime.utcnow().isoformat(),
                valid_until="2026-09-12T00:00:00Z",
                source="IMD (India Meteorological Department)",
                description="Moderate heat wave conditions expected.",
                impact="Risk of dehydration and heat exhaustion for outdoor workers.",
                recommended_action="Drink plenty of water. Stay indoors during peak sun hours (12 PM - 4 PM)."
            )
        ]

        return [alert for alert in all_alerts if location.lower() in alert.location.lower()]
