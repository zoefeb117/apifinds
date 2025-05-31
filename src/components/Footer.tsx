import React from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;