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
    "I need to integrate Stripe payments into my e-commerce app",
    "Fetch recent posts from my Facebook page",
    "Authenticate users via Instagram login",
    "Retrieve current weather for my city"
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border bg-card/50">
        <h2 className="text-lg font-semibold flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          API Recommendations
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Describe your project and integration needs, and I'll recommend the best third-party APIs for your use case.
        </p>
      </div>
      
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 tracking-tight">Describe Your Integration Needs</h3>
          <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
            Tell me about your project and what third-party services you'd like to integrate.
            I'll recommend the most suitable APIs and provide integration details.
          </p>
          <div className="grid grid-cols-1 gap-3 w-full max-w-lg">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                className="text-left p-4 border border-border rounded-xl hover:bg-muted/50 transition-all duration-200 text-sm font-medium group"
                onClick={() => handleExampleClick(prompt)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                  {prompt}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      
      <div className="p-6 border-t border-border bg-card/50">
        <div className="relative">
          <textarea
            ref={textareaRef}
            className="w-full p-4 pr-14 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none min-h-[56px] max-h-[200px] transition-all duration-200"
            placeholder="Describe your integration needs..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isProcessing}
          />
          <button
            className={`absolute right-2 bottom-2 p-3 rounded-xl transition-all duration-200 ${
              input.trim() && !isProcessing
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
            onClick={handleSendMessage}
            disabled={!input.trim() || isProcessing}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        {isProcessing && (
          <p className="text-xs text-muted-foreground mt-3 animate-pulse font-medium">
            Analyzing your needs and finding relevant APIs...
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatPanel;