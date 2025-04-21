export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

export interface DocumentFile {
  id: string;
  name: string;
  size: number;
  type: string;
  content: string;
}

export type AIModel = 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3' | 'gemini-pro';

export interface ChatbotConfig {
  id: string;
  name: string;
  model: AIModel;
  documents: DocumentFile[];
  createdAt: number;
}
