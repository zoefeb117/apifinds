import React, { useState } from 'react';
import { Schema } from '../types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from '../utils/motion';

interface SchemaDisplayProps {
  schema: Schema;
}

const SchemaDisplay: React.FC<SchemaDisplayProps> = ({ schema }) => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  // Parse the schema content
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
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Endpoints</h3>
        </div>
        
        {expandedSections['paths'] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-6 mt-2"
          >
            {Object.entries(schemaObj.paths).map(([path, methods]: [string, any]) => (
              <div key={path} className="mb-4">
                <div 
                  className="flex items-center cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  onClick={() => toggleSection(`path-${path}`)}
                >
                  {expandedSections[`path-${path}`] ? 
                    <ChevronDown className="h-4 w-4 mr-2" /> : 
                    <ChevronRight className="h-4 w-4 mr-2" />
                  }
                  <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-900 dark:text-gray-100">
                    {path}
                  </code>
                </div>
                
                {expandedSections[`path-${path}`] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-6 mt-2"
                  >
                    {Object.entries(methods).map(([method, details]: [string, any]) => (
                      <div key={`${path}-${method}`} className="mb-3 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                        <div className="flex items-center">
                          <span className={`uppercase font-mono text-xs px-2 py-1 rounded ${
                            method === 'get' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                            method === 'post' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' :
                            method === 'put' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                            method === 'delete' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' :
                            'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400'
                          }`}>
                            {method}
                          </span>
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            {details.summary || 'No description'}
                          </span>
                        </div>
                        
                        {details.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {details.description}
                          </p>
                        )}
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

  const renderComponents = () => {
    if (!schemaObj.components || !schemaObj.components.schemas) return null;
    
    return (
      <div className="mb-6">
        <div 
          className="flex items-center cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          onClick={() => toggleSection('components')}
        >
          {expandedSections['components'] ? 
            <ChevronDown className="h-4 w-4 mr-2" /> : 
            <ChevronRight className="h-4 w-4 mr-2" />
          }
          <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400">Models / Schemas</h3>
        </div>
        
        {expandedSections['components'] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-6 mt-2"
          >
            {Object.entries(schemaObj.components.schemas).map(([name, schema]: [string, any]) => (
              <div key={name} className="mb-4">
                <div 
                  className="flex items-center cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  onClick={() => toggleSection(`schema-${name}`)}
                >
                  {expandedSections[`schema-${name}`] ? 
                    <ChevronDown className="h-4 w-4 mr-2" /> : 
                    <ChevronRight className="h-4 w-4 mr-2" />
                  }
                  <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-900 dark:text-gray-100">
                    {name}
                  </code>
                </div>
                
                {expandedSections[`schema-${name}`] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-6 mt-2"
                  >
                    {schema.properties && (
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 uppercase border-b">
                          Properties
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          {Object.entries(schema.properties).map(([propName, propDetails]: [string, any]) => (
                            <div key={propName} className="px-4 py-3">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-900 dark:text-gray-100">{propName}</span>
                                <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                                  {propDetails.type || 'object'}
                                  {propDetails.format ? ` (${propDetails.format})` : ''}
                                </span>
                              </div>
                              {propDetails.description && (
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                  {propDetails.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
        {renderComponents()}
        
        <div className="mb-6">
          <div 
            className="flex items-center cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            onClick={() => toggleSection('raw')}
          >
            {expandedSections['raw'] ? 
              <ChevronDown className="h-4 w-4 mr-2" /> : 
              <ChevronRight className="h-4 w-4 mr-2" />
            }
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">Raw JSON</h3>
          </div>
          
          {expandedSections['raw'] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
            >
              <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-x-auto text-sm">
                <code className="text-gray-800 dark:text-gray-200">
                  {JSON.stringify(schemaObj, null, 2)}
                </code>
              </pre>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemaDisplay;