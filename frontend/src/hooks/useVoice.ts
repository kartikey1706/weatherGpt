import { useState, useCallback } from 'react';

export const useVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Speech to Text (STT)
  const startListening = useCallback((onResult: (text: string) => void, onError: (error: string) => void) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Default, could be dynamic based on language setting
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = (event: any) => {
      setIsListening(false);
      onError(event.error);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.start();
  }, []);

  // Text to Speech (TTS)
  const speak = useCallback(async (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Simple language detection for TTS
    // If text contains Hindi characters, use Hindi voice
    const hasHindi = /[ऀ-ॿ]/.test(text);
    utterance.lang = hasHindi ? 'hi-IN' : 'en-US';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  return { isListening, isSpeaking, startListening, speak };
};
