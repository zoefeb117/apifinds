import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { ChatMessage as ChatMessageType } from '../types';
import { Send, Sparkles } from 'lucide-react';

interface ChatPanelProps {
  messages: ChatMessageType[];
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ 
  messages, 
  onSendMessage,
  isProcessing
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (input.trim() && !isProcessing) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustTextareaHeight();
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
    onSendMessage(prompt);
  };

  const examplePrompts = [
    "I'm building an e-commerce platform and need payment processing integration",
    "My app needs social media authentication and sharing features",
    "I want to add AI-powered chat functionality to my application",
    "Looking to integrate email marketing services into my platform"
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          API Recommendations
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Describe your project and integration needs, and I'll recommend the best third-party APIs for your use case.
        </p>
      </div>
      
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Describe Your Integration Needs</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            Tell me about your project and what third-party services you'd like to integrate.
            I'll recommend the most suitable APIs and provide integration details.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-md">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                className="text-left p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
                onClick={() => handleExampleClick(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="relative">
          <textarea
            ref={textareaRef}
            className="w-full p-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[52px] max-h-[200px]"
            placeholder="Describe your integration needs..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isProcessing}
          />
          <button
            className={`absolute right-2 bottom-2 p-2 rounded-full ${
              input.trim() && !isProcessing
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            } transition-colors`}
            onClick={handleSendMessage}
            disabled={!input.trim() || isProcessing}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        {isProcessing && (
          <p className="text-xs text-gray-500 mt-2 animate-pulse">
            Analyzing your needs and finding relevant APIs...
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatPanel;