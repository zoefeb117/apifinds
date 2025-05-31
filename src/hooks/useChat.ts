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
    try {
      // Try to find a schema section
      const schemaMatch = text.match(/Schema:([\s\S]*?)(?=\n\n|$)/i);
      if (schemaMatch) {
        const schemaText = schemaMatch[1].trim();
        try {
          // Try parsing as JSON
          const parsed = JSON.parse(schemaText);
          return {
            id: Date.now().toString(),
            content: JSON.stringify(parsed, null, 2),
            version: 1,
            timestamp: new Date().toISOString()
          };
        } catch (e) {
          // If not valid JSON, create a basic schema structure
          return {
            id: Date.now().toString(),
            content: JSON.stringify({
              openapi: '3.0.0',
              info: {
                title: 'API Schema',
                version: '1.0.0',
                description: schemaText
              },
              paths: {}
            }, null, 2),
            version: 1,
            timestamp: new Date().toISOString()
          };
        }
      }

      // Try to find any JSON block
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[1].trim());
        return {
          id: Date.now().toString(),
          content: JSON.stringify(parsed, null, 2),
          version: 1,
          timestamp: new Date().toISOString()
        };
      }

      // If no schema or JSON found, create a basic schema from the text
      return {
        id: Date.now().toString(),
        content: JSON.stringify({
          openapi: '3.0.0',
          info: {
            title: 'API Response',
            version: '1.0.0',
            description: text
          },
          paths: {}
        }, null, 2),
        version: 1,
        timestamp: new Date().toISOString()
      };
    } catch (e) {
      console.debug('Failed to extract schema:', e);
      return null;
    }
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
    const systemMessageId = Date.now().toString();

    try {
      const handleToken = (token: string) => {
        accumulatedResponse += token;
        
        // Update the message immediately for streaming effect
        const systemMessage: ChatMessage = {
          id: systemMessageId,
          role: 'system',
          content: accumulatedResponse,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => {
          const filtered = prev.filter(msg => msg.id !== systemMessageId);
          return [...filtered, systemMessage];
        });

        // Try to extract schema from accumulated response
        const potentialSchema = extractSchema(accumulatedResponse);
        if (potentialSchema) {
          setSchema(potentialSchema);
        }
      };

      const response = await streamChat(content, currentSessionId, handleToken);
      setCurrentSessionId(response.sessionId);

      // Ensure we have a schema at the end
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