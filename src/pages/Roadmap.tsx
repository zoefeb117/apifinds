import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Map } from 'lucide-react';

const Roadmap: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Map className="h-8 w-8 text-black dark:text-white mr-4" />
            <h1 className="text-3xl font-bold">Product Roadmap</h1>
          </div>
          
          <div className="bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden" style={{ height: '600px' }}>
            <iframe src="https://nonstop-sunfish-444.notion.site/ebd/20d0d4a2aa0580ec8db7de3a2b416cee" width="100%" height="600" frameborder="0" allowfullscreen />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Roadmap;