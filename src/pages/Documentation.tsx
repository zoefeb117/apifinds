import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { BookOpen, Check } from 'lucide-react';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <div className="flex items-center mb-8">
              <BookOpen className="h-8 w-8 text-indigo-500 mr-4" />
              <h1 className="text-3xl font-bold">Documentation</h1>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Welcome to Velkros! This guide will help you get started with integrating APIs into your application.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-4">Quick Start</h3>
                    <ol className="space-y-4">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 text-indigo-500 rounded-full flex items-center justify-center mr-3 mt-1">1</span>
                        <span>Create a new project in the dashboard</span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 text-indigo-500 rounded-full flex items-center justify-center mr-3 mt-1">2</span>
                        <span>Describe your API needs in natural language</span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 text-indigo-500 rounded-full flex items-center justify-center mr-3 mt-1">3</span>
                        <span>Get instant API recommendations and integration guides</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {[
                        'Natural language API discovery',
                        'Instant integration guides',
                        'Security best practices',
                        'Code snippets and examples',
                        'API compatibility checks'
                      ].map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Core Concepts</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Projects</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Projects help you organize your API integrations. Each project can contain multiple API connections and configurations.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">API Discovery</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our natural language processing engine understands your requirements and suggests the most suitable APIs.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Integration Guides</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Get step-by-step instructions for implementing each API, complete with code samples and best practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Documentation;