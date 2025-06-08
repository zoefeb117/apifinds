import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { 
  Sun, Moon, ArrowRight, Sparkles, Zap, 
  Shield, Globe, Code, MessageSquare, Rocket, Lock, Send
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [prompt, setPrompt] = useState('');

  const features = [
    {
      icon: <Sparkles className="h-5 w-5 text-accent" />,
      title: "Smart API Discovery",
      description: "Describe your needs in plain language, and we'll recommend the perfect APIs for your project."
    },
    {
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      title: "Instant Integration Guides",
      description: "Get detailed integration instructions and code snippets for popular third-party services."
    },
    {
      icon: <Shield className="h-5 w-5 text-emerald-500" />,
      title: "Security Best Practices",
      description: "Built-in security recommendations and authentication implementation guides."
    },
    {
      icon: <Globe className="h-5 w-5 text-primary" />,
      title: "Comprehensive Coverage",
      description: "Support for payment, social media, AI, analytics, and many other API categories."
    }
  ];

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
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
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
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl hover:bg-muted transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center space-x-2"
              >
                <span>Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
                <span className="gradient-text">Connect Your Apps</span><br />
                <span className="text-foreground">Like Never Before</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                Describe your integration needs in plain language, and we'll recommend the best third-party APIs and services for your application.
              </p>
              
              {/* Prompt Box */}
              <div className="max-w-2xl mx-auto mb-12">
                <form onSubmit={handlePromptSubmit} className="relative">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to build..."
                    className="w-full px-6 py-4 bg-card border border-border rounded-2xl shadow-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-base"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
                
                {/* Quick Prompts */}
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  {quickPrompts.map((quickPrompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(quickPrompt)}
                      className="px-4 py-2.5 bg-muted hover:bg-muted/80 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-all duration-200 font-medium"
                    >
                      {quickPrompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl text-lg font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
                >
                  <span>Start Building</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate('/docs')}
                  className="px-8 py-4 bg-card border border-border hover:bg-muted rounded-2xl text-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
                >
                  <span>Documentation</span>
                  <Code className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-background py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Why Choose Velkros?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                Our intelligent platform helps you find and integrate the right APIs for your project, saving you hours of research and implementation time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 bg-card rounded-2xl border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-muted/30 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 tracking-tight">How Velkros Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                Get started with Velkros in three simple steps
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative p-8 bg-card rounded-2xl border border-border group hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold text-sm">1</div>
                <MessageSquare className="h-8 w-8 text-primary mb-6" />
                <h3 className="text-xl font-semibold mb-3 tracking-tight">Describe Your Needs</h3>
                <p className="text-muted-foreground leading-relaxed">Tell us what you want to build using natural language</p>
              </div>
              <div className="relative p-8 bg-card rounded-2xl border border-border group hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold text-sm">2</div>
                <Rocket className="h-8 w-8 text-primary mb-6" />
                <h3 className="text-xl font-semibold mb-3 tracking-tight">Get Recommendations</h3>
                <p className="text-muted-foreground leading-relaxed">Receive personalized API suggestions and integration guides</p>
              </div>
              <div className="relative p-8 bg-card rounded-2xl border border-border group hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold text-sm">3</div>
                <Lock className="h-8 w-8 text-primary mb-6" />
                <h3 className="text-xl font-semibold mb-3 tracking-tight">Integrate Securely</h3>
                <p className="text-muted-foreground leading-relaxed">Follow our security-first implementation guides</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary via-secondary to-accent py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Ready to Transform Your API Integration?</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto font-medium">
              Start building better applications faster with Velkros.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-white text-primary rounded-2xl text-lg font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-3 md:col-span-4 mb-8">
              <div className="h-8 w-8 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center">
                <div className="h-3 w-3 bg-white rounded-sm"></div>
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                © 2025 Velkros. All rights reserved.
              </span>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link to="/integrations" className="text-muted-foreground hover:text-foreground transition-colors">Integrations</Link></li>
                <li><Link to="/enterprise" className="text-muted-foreground hover:text-foreground transition-colors">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link to="/guides" className="text-muted-foreground hover:text-foreground transition-colors">API Guides</Link></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link to="/changelog" className="text-muted-foreground hover:text-foreground transition-colors">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link to="/partners" className="text-muted-foreground hover:text-foreground transition-colors">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link to="/security" className="text-muted-foreground hover:text-foreground transition-colors">Security</Link></li>
                <li><Link to="/compliance" className="text-muted-foreground hover:text-foreground transition-colors">Compliance</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;