export interface ChatMessage {
  id: string;
  role: 'user' | 'system';
  content: string;
  timestamp: string;
}

export interface Schema {
  id: string;
  content: string;
  version: number;
  timestamp: string;
}