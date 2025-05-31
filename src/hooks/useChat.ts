import { useState, useEffect, useRef } from 'react';
import { ChatMessage, Schema, Project } from '../types';
import { initializeChat, continueChatSession } from '../services/airops';

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

  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
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
      let response;
      let partialResponse = '';

      const handleToken = (token: string) => {
        partialResponse += token;
        const systemMessage: ChatMessage = {
          id: Date.now().toString(),
          role: 'system',
          content: partialResponse,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => {
          const filtered = prev.filter(msg => msg.role !== 'system' || msg.id !== systemMessage.id);
          return [...filtered, systemMessage];
        });
      };

      if (currentSessionId) {
        response = await continueChatSession(content, currentSessionId, handleToken);
      } else {
        response = await initializeChat(content, handleToken);
      }

      setCurrentSessionId(response.sessionId);

      try {
        const schemaData = JSON.parse(response.result);
        setSchema({
          id: Date.now().toString(),
          content: JSON.stringify(schemaData),
          version: 1,
          timestamp: new Date().toISOString()
        });
      } catch (e) {
        console.error('Failed to parse schema:', e);
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