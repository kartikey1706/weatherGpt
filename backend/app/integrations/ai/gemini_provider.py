import os
import google.generativeai as genai
from typing import Any, Dict
from .base import AIProvider

class GeminiProvider(AIProvider):
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-pro')

    async def generate_text(self, prompt: str, system_prompt: str) -> str:
        try:
            # Combine system prompt and user prompt for Gemini Pro
            full_prompt = f"{system_prompt}\n\nUser: {prompt}"
            response = self.model.generate_content(full_prompt)
            return response.text
        except Exception as e:
            return f"Error generating text: {str(e)}"

    async def extract_structured_data(self, prompt: str, system_prompt: str, schema: Any) -> Dict[str, Any]:
        # In a real implementation, we'd use Gemini's function calling or JSON mode
        # For the MVP, we'll prompt it to return JSON and parse it
        json_prompt = f"{system_prompt}\n\nReturn only valid JSON matching the schema: {schema}\n\nUser: {prompt}"
        response = await self.generate_text(prompt, json_prompt)

        import json
        try:
            # Simple cleaning of markdown json blocks if present
            cleaned = response.strip().removeprefix("```json").removesuffix("```").strip()
            return json.loads(cleaned)
        except Exception:
            return {}
