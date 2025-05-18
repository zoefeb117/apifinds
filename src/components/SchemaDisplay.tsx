import React, { useState } from 'react';
import { Schema } from '../types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from '../utils/motion';

interface SchemaDisplayProps {
  schema: Schema;
}

const SchemaDisplay: React.FC<SchemaDisplayProps> = ({ schema }) => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const schemaObj = React.useMemo(() => {
    try {
      return JSON.parse(schema.content);
    } catch (e) {
      return null;
    }
  }, [schema.content]);

  if (!schemaObj) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
        <p className="text-red-800 dark:text-red-400">Invalid JSON schema format</p>
        <pre className="mt-2 p-4 bg-white dark:bg-gray-800 rounded overflow-x-auto">
          {schema.content}
        </pre>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderPaths = () => {
    if (!schemaObj.paths) return null;
    
    return (
      <div className="mb-6">
        <div 
          className="flex items-center cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          onClick={() => toggleSection('paths')}
        >
          {expandedSections['paths'] ? 
            <ChevronDown className="h-4 w-4 mr-2" /> : 
            <ChevronRight className="h-4 w-4 mr-2" />
          }
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Available Platforms</h3>
        </div>
        
        {expandedSections['paths'] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-6 mt-2"
          >
            {Object.entries(schemaObj.paths).map(([platform, details]: [string, any]) => (
              <div key={platform} className="mb-4">
                <div 
                  className="flex items-center cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  onClick={() => toggleSection(`platform-${platform}`)}
                >
                  {expandedSections[`platform-${platform}`] ? 
                    <ChevronDown className="h-4 w-4 mr-2" /> : 
                    <ChevronRight className="h-4 w-4 mr-2" />
                  }
                  <h4 className="text-lg font-semibold">{platform}</h4>
                </div>
                
                {expandedSections[`platform-${platform}`] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-6 mt-2"
                  >
                    {details.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {details.description}
                      </p>
                    )}
                    {details.endpoints && Object.entries(details.endpoints).map(([endpoint, info]: [string, any]) => (
                      <div key={endpoint} className="mb-3 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                        <div className="flex items-center">
                          <span className={`uppercase font-mono text-xs px-2 py-1 rounded ${
                            info.method === 'GET' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                            info.method === 'POST' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' :
                            info.method === 'PUT' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                            'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                          }`}>
                            {info.method}
                          </span>
                          <code className="ml-2 font-mono text-sm">{endpoint}</code>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {info.description}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-lg font-bold">{schemaObj.info?.title || 'API Schema'}</h2>
        {schemaObj.info?.version && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Version: {schemaObj.info.version}
          </div>
        )}
        {schemaObj.info?.description && (
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {schemaObj.info.description}
          </p>
        )}
      </div>
      
      <div className="p-4">
        {renderPaths()}
      </div>
    </div>
  );
};

export default SchemaDisplay;