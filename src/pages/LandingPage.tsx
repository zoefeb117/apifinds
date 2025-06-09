import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { 
  Sun, Moon, ArrowRight, Send
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [prompt, setPrompt] = useState('');

  const quickPrompts = [
    "I need to integrate Stripe payments into my e-commerce app",
    "Fetch recent posts from my Facebook page",
    "Authenticate users via Instagram login",
    "Retrieve current weather for my city"
  ];

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate('/dashboard', { state: { initialPrompt: prompt } });
    }
  };

  const handleQuickPrompt = (quickPrompt: string) => {
    navigate('/dashboard', { state: { initialPrompt: quickPrompt } });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 flex items-center justify-center">
                <img 
                  src={theme === 'light' ? '/logo dark mode.png' : '/logo light mode.png'} 
                  alt="Velkros Logo" 
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">Velkros</h1>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/docs" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                Documentation
              </Link>
              <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                Blog
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg flex items-center space-x-2"
              >
                <span>Open Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Welcome to<br />Velkros Beta
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Describe your integration needs in plain language, and we'll recommend the best third-party APIs and services for your application.
              </p>
              
              {/* Prompt Box */}
              <div className="max-w-2xl mx-auto mb-8">
                <form onSubmit={handlePromptSubmit} className="relative">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to build..."
                    className="w-full px-6 py-4 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
                
                {/* Quick Prompts */}
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {quickPrompts.map((quickPrompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(quickPrompt)}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      {quickPrompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg text-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Start Building</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3 md:col-span-3 mb-8">
              <div className="h-8 w-8 flex items-center justify-center">
                <img 
                  src={theme === 'light' ? '/logo dark mode.png' : '/logo light mode.png'} 
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
                <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Blog</Link></li>
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
    </div>
  );
};

export default LandingPage;