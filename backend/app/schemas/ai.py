from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class WeatherFact(BaseModel):
    label: str = Field(..., description="The name of the weather variable (e.g., Temperature)")
    value: str = Field(..., description="The value of the variable")
    unit: Optional[str] = Field(None, description="The unit of measurement (e.g., °C)")

class RiskInfo(BaseModel):
    level: str = Field(..., description="Risk level: low, moderate, high, or extreme")
    reason: str = Field(..., description="Explanation for the risk level based on data")

class GroundedResponse(BaseModel):
    answer: str = Field(..., description="The natural language response to the user")
    facts: List[WeatherFact] = Field(default_factory=list, description="List of factual data points used in the answer")
    risk: Optional[RiskInfo] = Field(None, description="Risk assessment derived from the data")
    advisory: List[str] = Field(default_factory=list, description="Practical recommendations based on the weather")
    official_alerts: List[str] = Field(default_factory=list, description="Relevant official warnings")
    source: str = Field(..., description="The data source used")
    data_timestamp: str = Field(..., description="Timestamp of the observation")
    language: str = Field("en", description="Response language")
    location: Dict[str, Any] = Field(..., description="The location context")
