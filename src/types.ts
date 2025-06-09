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

export interface Project {
  id: string;
  name: string;
  lastUpdated: string;
}

// Extend the Window interface to include Intercom
declare global {
  interface Window {
    Intercom?: any;
  }
}