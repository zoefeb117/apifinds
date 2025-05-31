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
      // First try to find a JSON block
      const jsonBlockMatch = text.match(/```json\n([\s\S]*?)\n```/);
      if (jsonBlockMatch) {
        const parsed = JSON.parse(jsonBlockMatch[1].trim());
        return {
          id: Date.now().toString(),
          content: JSON.stringify(parsed, null, 2),
          version: 1,
          timestamp: new Date().toISOString()
        };
      }

      // Then try to find any code block that might contain JSON
      const codeBlockMatch = text.match(/```([\s\S]*?)```/);
      if (codeBlockMatch) {
        const content = codeBlockMatch[1].trim();
        try {
          const parsed = JSON.parse(content);
          return {
            id: Date.now().toString(),
            content: JSON.stringify(parsed, null, 2),
            version: 1,
            timestamp: new Date().toISOString()
          };
        } catch (e) {
          // Not valid JSON, ignore
        }
      }

      // Finally, try to parse the entire text as JSON
      const parsed = JSON.parse(text);
      return {
        id: Date.now().toString(),
        content: JSON.stringify(parsed, null, 2),
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
          console.log('Found schema:', potentialSchema);
          setSchema(potentialSchema);
        }
      };

      const response = await streamChat(content, currentSessionId, handleToken);
      setCurrentSessionId(response.sessionId);

      // One final attempt to extract schema from complete response
      if (!schema) {
        const finalSchema = extractSchema(response.result);
        if (finalSchema) {
          console.log('Found final schema:', finalSchema);
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