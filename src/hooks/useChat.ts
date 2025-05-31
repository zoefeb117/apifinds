import { useState, useEffect } from 'react';
import { ChatMessage, Schema, Project } from '../types';

export const useChat = (initialPrompt?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [schema, setSchema] = useState<Schema | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  // Handle initial prompt when component mounts
  useEffect(() => {
    if (initialPrompt) {
      sendMessage(initialPrompt);
    }
  }, []);

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
    
    // Create new project if none exists
    if (!currentProjectId) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: content.slice(0, 30) + '...',
        lastUpdated: new Date().toISOString()
      };
      setProjects(prev => [newProject, ...prev]);
      setCurrentProjectId(newProject.id);
    } else {
      // Update existing project
      setProjects(prev => prev.map(project => 
        project.id === currentProjectId 
          ? { ...project, lastUpdated: new Date().toISOString() }
          : project
      ));
    }
    
    // Simulate API response
    setTimeout(() => {
      const systemMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `Based on your needs, here are the recommended APIs and integration details.`,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, systemMessage]);
      
      setSchema({
        id: Date.now().toString(),
        content: JSON.stringify(generateMockSchema(content)),
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

// Mock schema generator
const generateMockSchema = (content: string) => {
  const apis = {
    'payment': {
      'Stripe': {
        'description': 'Payment processing API',
        'endpoints': {
          '/v1/payments': { 'method': 'POST', 'description': 'Create a payment' },
          '/v1/refunds': { 'method': 'POST', 'description': 'Issue a refund' }
        }
      },
      'PayPal': {
        'description': 'Payment gateway API',
        'endpoints': {
          '/v1/orders': { 'method': 'POST', 'description': 'Create an order' },
          '/v1/payments': { 'method': 'POST', 'description': 'Process payment' }
        }
      }
    },
    'social': {
      'Facebook': {
        'description': 'Social media integration',
        'endpoints': {
          '/v1/share': { 'method': 'POST', 'description': 'Share content' },
          '/v1/user': { 'method': 'GET', 'description': 'Get user profile' }
        }
      },
      'Twitter': {
        'description': 'Social media API',
        'endpoints': {
          '/v1/tweets': { 'method': 'POST', 'description': 'Post a tweet' },
          '/v1/user': { 'method': 'GET', 'description': 'Get user info' }
        }
      }
    }
  };

  const content_lower = content.toLowerCase();
  let selectedApis = {};

  if (content_lower.includes('payment')) {
    selectedApis = { ...selectedApis, ...apis.payment };
  }
  if (content_lower.includes('social')) {
    selectedApis = { ...selectedApis, ...apis.social };
  }

  return {
    openapi: '3.0.0',
    info: {
      title: 'Recommended APIs',
      version: '1.0.0',
      description: 'API recommendations based on your requirements'
    },
    paths: selectedApis
  };
};