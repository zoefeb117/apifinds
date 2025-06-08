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
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'} p-3 rounded-lg`}>
        {message.content}
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;