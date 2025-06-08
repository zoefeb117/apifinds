import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';
import OutputPanel from './OutputPanel';
import { ChatMessage, Schema } from '../types';
import { useChat } from '../hooks/useChat';

const Dashboard: React.FC = () => {
  const [resizing, setResizing] = useState(false);
  const [splitPosition, setSplitPosition] = useState(40); // percentage
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const initialPrompt = location.state?.initialPrompt;
  
  const { 
    messages, 
    schema, 
    sendMessage, 
    isProcessing,
    projects,
    currentProjectId,
    createNewChat
  } = useChat(initialPrompt);

  const handleMouseDown = (e: React.MouseEvent) => {
    setResizing(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (resizing) {
      const container = document.getElementById('split-container');
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        if (newPosition >= 20 && newPosition <= 80) {
          setSplitPosition(newPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelectProject = (id: string) => {
    // In a real app, this would load the project's messages and schema
    console.log('Selected project:', id);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header />
      
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={toggleSidebar}
          projects={projects}
          currentProjectId={currentProjectId}
          onNewChat={createNewChat}
          onSelectProject={handleSelectProject}
        />
        
        <div 
          id="split-container"
          className="flex flex-1 overflow-hidden relative"
          style={{ marginLeft: isSidebarOpen ? '64px' : '0' }}
        >
          <div 
            className="overflow-y-auto transition-all duration-200 ease-in-out"
            style={{ width: `${splitPosition}%` }}
          >
            <ChatPanel 
              messages={messages} 
              onSendMessage={sendMessage} 
              isProcessing={isProcessing}
            />
          </div>
          
          <div
            className={`w-1 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-500 cursor-col-resize relative z-10 ${
              resizing ? 'bg-blue-400 dark:bg-blue-500' : ''
            }`}
            onMouseDown={handleMouseDown}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-10 flex items-center justify-center">
              <div className="w-1 h-6 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            </div>
          </div>
          
          <div 
            className="overflow-y-auto transition-all duration-200 ease-in-out"
            style={{ width: `${100 - splitPosition}%` }}
          >
            <OutputPanel schema={schema} isProcessing={isProcessing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;