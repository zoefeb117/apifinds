import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { 
  Link as LinkIcon, Sun, Moon, ArrowRight, Sparkles, Zap, 
  Shield, Globe, Code, MessageSquare, Rocket, Lock, Send
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [prompt, setPrompt] = useState('');

  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      title: "Smart API Discovery",
      description: "Describe your needs in plain language, and we'll recommend the perfect APIs for your project."
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Instant Integration Guides",
      description: "Get detailed integration instructions and code snippets for popular third-party services."
    },
    {
      icon: <Shield className="h-6 w-6 text-green-500" />,
      title: "Security Best Practices",
      description: "Built-in security recommendations and authentication implementation guides."
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-500" />,
      title: "Comprehensive Coverage",
      description: "Support for payment, social media, AI, analytics, and many other API categories."
    }
  ];

  const quickPrompts = [
    "I need to integrate Stripe payments into my e-commerce app",
    "Looking for social media authentication options",
    "Help me find an email marketing API",
    "Need real-time chat integration suggestions"
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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <LinkIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Velkros</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Connect Your Apps with Ease</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/docs" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                Documentation
              </Link>
              <Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                Pricing
              </Link>
              <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                Blog
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex items-center space-x-2"
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-6">
                Connect Your Apps<br />Like Never Before
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
                    className="w-full px-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
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
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      {quickPrompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Start Building</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate('/docs')}
                  className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <span>View Documentation</span>
                  <Code className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-900 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Velkros?</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our intelligent platform helps you find and integrate the right APIs for your project, saving you hours of research and implementation time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 dark:bg-gray-800 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How Velkros Works</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Get started with Velkros in three simple steps
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative p-6 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <MessageSquare className="h-8 w-8 text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Describe Your Needs</h3>
                <p className="text-gray-600 dark:text-gray-400">Tell us what you want to build using natural language</p>
              </div>
              <div className="relative p-6 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <Rocket className="h-8 w-8 text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
                <p className="text-gray-600 dark:text-gray-400">Receive personalized API suggestions and integration guides</p>
              </div>
              <div className="relative p-6 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <Lock className="h-8 w-8 text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Integrate Securely</h3>
                <p className="text-gray-600 dark:text-gray-400">Follow our security-first implementation guides</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your API Integration?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Start building better applications faster with Velkros.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-3 md:col-span-4 mb-8">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <LinkIcon className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 Velkros. All rights reserved.
              </span>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Pricing</Link></li>
                <li><Link to="/integrations" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Integrations</Link></li>
                <li><Link to="/enterprise" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/docs" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Documentation</Link></li>
                <li><Link to="/guides" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">API Guides</Link></li>
                <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Blog</Link></li>
                <li><Link to="/changelog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">About</Link></li>
                <li><Link to="/careers" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Careers</Link></li>
                <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Contact</Link></li>
                <li><Link to="/partners" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Terms of Service</Link></li>
                <li><Link to="/security" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Security</Link></li>
                <li><Link to="/compliance" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Compliance</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;