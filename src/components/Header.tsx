import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Download, HelpCircle, Settings } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="h-9 w-9 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all duration-300">
              <div className="h-4 w-4 bg-white rounded-sm"></div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight gradient-text">Velkros</h1>
            <p className="text-xs text-muted-foreground font-medium">Connect Your Apps</p>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          <button 
            className="p-2.5 rounded-xl hover:bg-muted transition-colors duration-200"
            aria-label="Download schema"
            title="Download schema"
          >
            <Download className="h-4 w-4" />
          </button>
          
          <button 
            className="p-2.5 rounded-xl hover:bg-muted transition-colors duration-200"
            aria-label="Settings"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
          
          <button 
            className="p-2.5 rounded-xl hover:bg-muted transition-colors duration-200"
            aria-label="Help"
            title="Help"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
          
          <button 
            className="p-2.5 rounded-xl hover:bg-muted transition-colors duration-200"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;