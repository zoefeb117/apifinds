import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-3 md:col-span-3 mb-8">
            <div className="h-8 w-8 flex items-center justify-center">
              <img 
                src={theme === 'light' ? '/logo light mode.png' : '/logo dark mode.png'} 
                alt="Velkros Logo" 
                className="h-6 w-6 object-contain"
              />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 Velkros. All rights reserved.
            </span>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Features</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/docs" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Documentation</Link></li>
              <li><a href="https://www.velkros.com/blog" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;