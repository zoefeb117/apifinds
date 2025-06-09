import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Download, HelpCircle, Settings } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-colors duration-200">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="h-10 w-10 flex items-center justify-center group-hover:opacity-80 transition-all">
            <img 
              src={theme === 'light' ? '/logo dark mode.png' : '/logo light mode.png'} 
              alt="Velkros Logo" 
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">Velkros</h1>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150"
            aria-label="Download schema"
            title="Download schema"
          >
            <Download className="h-5 w-5" />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150"
            aria-label="Settings"
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150"
            aria-label="Help"
            title="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150"
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