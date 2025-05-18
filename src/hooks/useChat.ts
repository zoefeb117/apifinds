import { useState } from 'react';
import { ChatMessage, Schema, Project } from '../types';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [schema, setSchema] = useState<Schema | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'E-commerce Platform', lastUpdated: '2025-03-15' },
    { id: '2', name: 'Social Media App', lastUpdated: '2025-03-14' },
    { id: '3', name: 'AI Chat Integration', lastUpdated: '2025-03-13' },
  ]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

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
  };

  const sendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Update project timestamp
    if (currentProjectId) {
      setProjects(prev => prev.map(project => 
        project.id === currentProjectId 
          ? { ...project, lastUpdated: new Date().toISOString() }
          : project
      ));
    }
    
    // Simulate API recommendation generation
    setTimeout(() => {
      const systemMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `Based on your project description: "${content}", I've identified relevant APIs and integration options. You can find the recommended endpoints and integration details in the panel on the right.`,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, systemMessage]);
      
      setSchema({
        id: Date.now().toString(),
        content: JSON.stringify(mockRecommendations),
        version: 1,
        timestamp: new Date().toISOString()
      });
      
      setIsProcessing(false);
    }, 1500);
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

// Mock API recommendations schema
const mockRecommendations = {
  openapi: "3.0.0",
  info: {
    title: "Recommended APIs",
    description: "Curated API recommendations based on your project needs",
    version: "1.0.0"
  },
  // ... rest of the mock schema
};