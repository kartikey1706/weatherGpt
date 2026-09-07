import pytest
from app.intelligence.validation_engine import ValidationEngine

def test_validation_no_data():
    engine = ValidationEngine()
    # Case 1: No data provided, response contains numbers -> Should Fail
    is_valid, msg = engine.validate_response("It will be 30°C tomorrow", None)
    assert is_valid is False
    assert "numerical weather data" in msg

    # Case 2: No data provided, response contains no numbers -> Should Pass
    is_valid, msg = engine.validate_response("It will be cloudy tomorrow", None)
    assert is_valid is True

def test_validation_with_data():
    engine = ValidationEngine()
    # Mock weather data (contains "29.0" and "68")
    mock_data = "Current temperature is 29.0°C and humidity is 68%"

    # Case 1: Response contains provided value -> Should Pass
    is_valid, msg = engine.validate_response("The temperature is 29.0°C", mock_data)
    assert is_valid is True

    # Case 2: Response contains hallucinated value -> Should Fail
    is_valid, msg = engine.validate_response("The temperature is 35.0°C", mock_data)
    assert is_valid is False
    assert "Hallucinated value found: 35.0°C" in msg
