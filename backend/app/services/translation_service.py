from abc import ABC, abstractmethod
from typing import Dict

class TranslationProvider(ABC):
    @abstractmethod
    async def translate(self, text: str, target_lang: str) -> str:
        """Translate text to the target language."""
        pass

class MockTranslationProvider(TranslationProvider):
    def __init__(self):
        # Simple mock mapping for the most critical terms
        self.dictionary = {
            "hi": {
                "Moderate": "मध्यम",
                "High": "उच्च",
                "Extreme": "अत्यधिक",
                "Low": "कम",
                "Rain": "बारिश",
                "Heat": "गर्मी",
                "Wind": "हवा",
                "Grounded in trusted data": "भरोसेमंद डेटा पर आधारित",
                "Official Warning": "आधिकारिक चेतावनी",
                "AI Advisory": "AI सलाह"
            }
        }

    async def translate(self, text: str, target_lang: str) -> str:
        if target_lang == "en":
            return text

        lang_dict = self.dictionary.get(target_lang, {})
        # Simple word replacement for demo
        translated = text
        for eng, hi in lang_dict.items():
            translated = translated.replace(eng, hi)

        # If it's a long sentence and not in dict, just return it with a [translated] marker for demo
        if translated == text and target_lang != "en":
            return f"{text} [{target_lang}]"

        return translated

class TranslationService:
    def __init__(self):
        self.provider = MockTranslationProvider()

    async def translate_text(self, text: str, target_lang: str) -> str:
        return await self.provider.translate(text, target_lang)

    async def translate_list(self, texts: list[str], target_lang: str) -> list[str]:
        return [await self.translate_text(t, target_lang) for t in texts]

translation_service = TranslationService()
