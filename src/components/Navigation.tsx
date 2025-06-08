import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
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
            {[
              { path: '/docs', label: 'Documentation' },
              { path: '/pricing', label: 'Pricing' },
              { path: '/blog', label: 'Blog' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-medium transition-colors relative ${
                  location.pathname === path
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
                {location.pathname === path && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-muted transition-colors duration-200"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            
            <Link
              to="/dashboard"
              className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;