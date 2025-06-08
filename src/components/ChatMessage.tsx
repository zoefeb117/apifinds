import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { User, Bot } from 'lucide-react';
import { motion } from '../utils/motion';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
          <Bot className="h-5 w-5 text-primary" />
        </div>
      )}
      
      <div className={`max-w-[80%] p-4 rounded-2xl ${
        isUser 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-card border border-border'
      }`}>
        <p className="leading-relaxed">{message.content}</p>
      </div>
      
      {isUser && (
        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
          <User className="h-5 w-5 text-primary-foreground" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;