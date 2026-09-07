from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ClimateStat(BaseModel):
    year: int
    avg_temp: float
    total_rainfall: float
    anomaly: float = Field(..., description="Deviation from long-term average")

class ClimateTrend(BaseModel):
    variable: str # 'temperature' or 'rainfall'
    data: List[ClimateStat]
    location: str
    period: str # e.g., "1990-2023"
