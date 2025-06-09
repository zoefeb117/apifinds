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
        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-black dark:text-white" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white'} p-3 rounded-lg`}>
        {message.content}
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-white dark:text-black" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;