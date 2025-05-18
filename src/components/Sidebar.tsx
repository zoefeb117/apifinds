import React from 'react';
import { PanelLeftClose, PanelLeft, Plus, MessageSquare } from 'lucide-react';
import { Project } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  projects: Project[];
  currentProjectId: string | null;
  onNewChat: () => void;
  onSelectProject: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onToggle, 
  projects,
  currentProjectId,
  onNewChat,
  onSelectProject
}) => {
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
              onClick={onNewChat}
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
                onClick={() => onSelectProject(project.id)}
                className={`w-full p-3 flex items-center space-x-3 rounded-lg transition-colors text-left ${
                  currentProjectId === project.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
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