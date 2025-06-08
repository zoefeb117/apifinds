import { useState, useEffect, useRef } from 'react';
import { ChatMessage, Schema, Project } from '../types';
import { streamChat } from '../services/n8n';

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

    let accumulatedResponse = '';

    try {
      const handleToken = (token: string) => {
        accumulatedResponse += token;
        
        // Update schema with accumulated response
        setSchema({
          id: Date.now().toString(),
          content: accumulatedResponse,
          version: 1,
          timestamp: new Date().toISOString()
        });
      };

      // Pass current output content to the n8n workflow
      const currentOutput = schema?.content || '';
      const response = await streamChat(content, currentSessionId, handleToken, currentOutput);
      setCurrentSessionId(response.sessionId);

      // Ensure final response is set
      setSchema({
        id: Date.now().toString(),
        content: response.result,
        version: 1,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setSchema({
        id: Date.now().toString(),
        content: 'Sorry, there was an error processing your request.',
        version: 1,
        timestamp: new Date().toISOString()
      });
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