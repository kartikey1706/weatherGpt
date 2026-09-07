from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class OfficialAlert(BaseModel):
    id: str
    hazard: str = Field(..., description="Type of hazard (e.g., Heavy Rain, Heatwave)")
    severity: str = Field(..., description="Severity level: Low, Moderate, High, Extreme")
    affected_location: str = Field(..., description="Location affected by the alert")
    issued_at: datetime
    valid_from: datetime
    valid_until: datetime
    source: str = Field(..., description="Official source (e.g., IMD)")
    description: str = Field(..., description="Detailed official warning text")
