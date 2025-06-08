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
      className={`fixed top-[73px] left-0 h-[calc(100vh-73px)] bg-card border-r border-border transition-all duration-300 z-20 ${
        isOpen ? 'w-64' : 'w-0'
      }`}
    >
      <button
        onClick={onToggle}
        className="absolute -right-10 top-4 p-2.5 bg-card border border-border rounded-xl shadow-sm hover:bg-muted transition-colors duration-200"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? (
          <PanelLeftClose className="h-4 w-4" />
        ) : (
          <PanelLeft className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
            <button 
              onClick={onNewChat}
              className="p-2 text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 rounded-xl transition-all duration-200"
              aria-label="New project"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className={`w-full p-4 flex items-center space-x-3 rounded-xl transition-all duration-200 text-left group ${
                  currentProjectId === project.id
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'hover:bg-muted border border-transparent'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  currentProjectId === project.id 
                    ? 'bg-primary/20' 
                    : 'bg-muted group-hover:bg-muted/80'
                }`}>
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{project.name}</p>
                  <p className="text-xs text-muted-foreground">
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