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
}

export const chatService = {
  async sendMessage(message: string): Promise<ChatResponse> {
    const response = await api.post('/chat', { message });
    return response.data;
  },
};
