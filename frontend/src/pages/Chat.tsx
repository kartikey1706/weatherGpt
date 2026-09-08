import React from 'react';
import { useLocation } from 'react-router-dom';
import ChatInterface from '../components/chat/ChatInterface';

const Chat = () => {
  const location = useLocation();
  const initialPrompt = location.state?.initialPrompt;

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 border-b border-slate-700 bg-weather-secondary">
        <h1 className="text-xl font-bold text-weather-accent">WeatherGPT AI</h1>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatInterface initialPrompt={initialPrompt} />
      </main>
    </div>
  );
};

export default Chat;
