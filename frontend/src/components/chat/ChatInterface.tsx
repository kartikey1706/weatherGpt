import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Loader2, Volume2, MessageSquare, ChevronDown, ChevronUp, Activity } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';

// Declare Web Speech API types
interface SpeechRecognitionEvent extends Event {
  results: any[];
}
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  weather?: any;
  location?: any;
  trace?: string[];
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { location } = useLocation();
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const currentInput = textOverride || input;
    if (!currentInput.trim()) return;

    const userMsg: Message = { role: 'user', content: currentInput };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/chat', {
        message: currentInput,
        location: location,
      });

      const assistantMsg: Message = {
        role: 'assistant',
        content: response.data.answer,
        weather: response.data.weather,
        location: response.data.location,
        trace: response.data.trace,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error('Error starting speech recognition:', e);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user'
                ? 'bg-weather-accent text-weather-primary rounded-tr-none'
                : 'bg-weather-secondary border border-slate-700 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.weather && (
                <div className="mt-3 p-3 bg-black/20 rounded-lg text-xs space-y-1 border border-white/10">
                  <div className="font-bold text-weather-accent uppercase tracking-tighter">Weather Facts</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>Temp: {msg.weather.current.temperature_c}°C</div>
                    <div>Humidity: {msg.weather.current.humidity_percent}%</div>
                    <div className="col-span-2">Condition: {msg.weather.current.condition}</div>
                  </div>
                </div>
              )}
              {msg.role === 'assistant' && (
                <div className="mt-4 space-y-2 border-t border-slate-700 pt-2">
                  <button
                    onClick={() => speak(msg.content)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors mr-4"
                  >
                    <Volume2 className="h-3 w-3" /> Listen
                  </button>

                  {msg.trace && (
                    <TraceView trace={msg.trace} />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-weather-secondary border border-slate-700 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-weather-accent" />
              <span className="text-sm text-slate-400">WeatherGPT is thinking...</span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={language === 'hi' ? "WeatherGPT से कुछ भी पूछें..." : "Ask about the weather..."}
          className="w-full px-4 py-4 pl-12 pr-24 rounded-2xl bg-weather-secondary border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-weather-accent transition-all"
        />
        <div className="absolute left-3 top-3.5 text-slate-500">
          <MessageSquare className="h-6 w-6" />
        </div>
        <div className="absolute right-2 top-2 flex gap-2">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-2 rounded-xl transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="h-6 w-6" />
          </button>
          <button
            onClick={() => handleSend()}
            disabled={isLoading}
            className="p-2 bg-weather-accent text-weather-primary rounded-xl hover:bg-sky-300 transition-colors disabled:opacity-50"
          >
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TraceView: React.FC<{ trace: string[] }> = ({ trace }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[10px] text-slate-500 hover:text-weather-accent transition-colors uppercase tracking-widest font-bold"
      >
        <Activity className="h-3 w-3" />
        {isOpen ? 'Hide Intelligence Trace' : 'View Intelligence Trace'}
        {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>
      {isOpen && (
        <div className="mt-2 p-3 bg-black/30 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
          {trace.map((step, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-weather-accent opacity-50">[{i + 1}]</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
