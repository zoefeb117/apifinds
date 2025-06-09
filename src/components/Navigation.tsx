import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as LinkIcon, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-colors duration-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <LinkIcon className="h-5 w-5 text-white dark:text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Velkros</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Connect Your Apps with Ease</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: '/docs', label: 'Documentation' },
              { path: '/pricing', label: 'Pricing' },
              { path: '/blog', label: 'Blog' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-black dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;