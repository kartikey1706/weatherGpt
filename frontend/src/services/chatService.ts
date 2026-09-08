import api from './api';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: any;
}

export interface ChatResponse {
  answer: string;
  intent: string;
  location: any;
  language: string;
  session_id: number;
  trace: string[];
}

export const chatService = {
  async sendMessage(message: string, sessionId?: number, location?: any): Promise<ChatResponse> {
    const response = await api.post('/chat', {
      message,
      session_id: sessionId,
      location: location
    });
    return response.data;
  },
};
