import { useState, useEffect, useRef } from 'react';
import { ChatMessage, Schema, Project } from '../types';
import { streamChat } from '../services/airops';

export const useChat = (initialPrompt?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [schema, setSchema] = useState<Schema | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const initialPromptProcessed = useRef(false);

  useEffect(() => {
    if (initialPrompt && !initialPromptProcessed.current) {
      initialPromptProcessed.current = true;
      sendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const createNewChat = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: 'New Project',
      lastUpdated: new Date().toISOString(),
    };
    setProjects(prev => [newProject, ...prev]);
    setCurrentProjectId(newProject.id);
    setMessages([]);
    setSchema(null);
    setCurrentSessionId(null);
    initialPromptProcessed.current = false;
  };

  const extractSchema = (text: string): Schema | null => {
    // Try to find JSON content in various formats
    const patterns = [
      /```json\n([\s\S]*?)\n```/, // Markdown JSON block
      /```([\s\S]*?)```/, // Any code block
      /{[\s\S]*}/ // Raw JSON
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        try {
          const jsonContent = match[1] || match[0];
          const parsed = JSON.parse(jsonContent.replace(/```/g, '').trim());
          if (parsed && typeof parsed === 'object') {
            return {
              id: Date.now().toString(),
              content: JSON.stringify(parsed, null, 2),
              version: 1,
              timestamp: new Date().toISOString()
            };
          }
        } catch (e) {
          console.debug('Failed to parse potential schema:', e);
          continue;
        }
      }
    }
    return null;
  };

  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    setSchema(null); // Clear previous schema
    
    if (!currentProjectId) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: content.slice(0, 30) + '...',
        lastUpdated: new Date().toISOString()
      };
      setProjects(prev => [newProject, ...prev]);
      setCurrentProjectId(newProject.id);
    } else {
      setProjects(prev => prev.map(project => 
        project.id === currentProjectId 
          ? { ...project, lastUpdated: new Date().toISOString() }
          : project
      ));
    }

    try {
      let partialResponse = '';
      const systemMessageId = Date.now().toString();

      const handleToken = (token: string) => {
        partialResponse += token;
        
        // Try to extract schema from partial response
        const potentialSchema = extractSchema(partialResponse);
        if (potentialSchema) {
          setSchema(potentialSchema);
        }

        const systemMessage: ChatMessage = {
          id: systemMessageId,
          role: 'system',
          content: partialResponse,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => {
          const filtered = prev.filter(msg => msg.id !== systemMessageId);
          return [...filtered, systemMessage];
        });
      };

      const response = await streamChat(content, currentSessionId, handleToken);
      setCurrentSessionId(response.sessionId);

      // Final attempt to extract schema from complete response
      if (!schema) {
        const finalSchema = extractSchema(response.result);
        if (finalSchema) {
          setSchema(finalSchema);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'system',
        content: 'Sorry, there was an error processing your request.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    messages,
    schema,
    sendMessage,
    isProcessing,
    projects,
    currentProjectId,
    createNewChat
  };
};