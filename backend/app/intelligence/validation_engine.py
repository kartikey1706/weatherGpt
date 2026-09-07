import re
from typing import Tuple, List

class ValidationEngine:
    def __init__(self):
        # Regex to find numbers followed by units like °C, mm, km/h, %
        self.weather_pattern = re.compile(r'(\d+(?:\.\d+)?)\s*(°C|mm|km/h|%)')

    def validate_response(self, response: str, provided_data: any) -> Tuple[bool, str]:
        """
        Checks if the response contains any numerical weather data that wasn't provided in the source data.
        """
        if not provided_data:
            # If no data was provided, the response should not contain any specific numbers
            matches = self.weather_pattern.findall(response)
            if matches:
                return False, "Response contains numerical weather data that was not provided."
            return True, ""

        # Extract all numbers from provided data
        allowed_values = set()

        # Simplified: convert provided data to string and check if numbers exist there
        # In a real app, we'd extract specific values from the WeatherDataSchema
        provided_str = str(provided_data)

        matches = self.weather_pattern.findall(response)
        for value, unit in matches:
            if value not in provided_str:
                return False, f"Hallucinated value found: {value}{unit}"

        return True, ""
