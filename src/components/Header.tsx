import React from 'react';
import { Sun, Moon, GitBranch, Download, HelpCircle, Settings } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <GitBranch className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">apifinds</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">Natural Language API Schema Generator</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            aria-label="Download schema"
            title="Download schema"
          >
            <Download className="h-5 w-5" />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            aria-label="Settings"
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            aria-label="Help"
            title="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;