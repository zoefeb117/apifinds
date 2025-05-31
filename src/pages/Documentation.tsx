import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft } from 'lucide-react';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="flex items-center mb-8">
          <BookOpen className="h-8 w-8 text-indigo-500 mr-4" />
          <h1 className="text-3xl font-bold">Documentation</h1>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Welcome to the Velkros documentation. Learn how to integrate APIs efficiently using our platform.
          </p>
          
          <h2>Getting Started</h2>
          <p>Documentation content will be added here...</p>
        </div>
      </div>
    </div>
  );
}

export default Documentation;