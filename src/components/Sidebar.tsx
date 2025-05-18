import React from 'react';
import { PanelLeftClose, PanelLeft, Plus, MessageSquare } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  lastUpdated: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  // Mock projects data - in a real app this would come from your backend
  const projects: Project[] = [
    { id: '1', name: 'E-commerce Platform', lastUpdated: '2025-03-15' },
    { id: '2', name: 'Social Media App', lastUpdated: '2025-03-14' },
    { id: '3', name: 'AI Chat Integration', lastUpdated: '2025-03-13' },
  ];

  return (
    <div 
      className={`fixed top-[61px] left-0 h-[calc(100vh-61px)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-20 ${
        isOpen ? 'w-64' : 'w-0'
      }`}
    >
      <button
        onClick={onToggle}
        className="absolute -right-10 top-4 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? (
          <PanelLeftClose className="h-4 w-4" />
        ) : (
          <PanelLeft className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Projects</h2>
            <button 
              className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-lg"
              aria-label="New project"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2">
            {projects.map((project) => (
              <button
                key={project.id}
                className="w-full p-3 flex items-center space-x-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <MessageSquare className="h-4 w-4 text-gray-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{project.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Updated {new Date(project.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;