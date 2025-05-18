import React, { useState } from 'react';
import { Schema } from '../types';
import { Brackets as CodeBracket, Copy, Check, Download, Maximize2, Minimize2 } from 'lucide-react';
import SchemaDisplay from './SchemaDisplay';

interface OutputPanelProps {
  schema: Schema | null;
  isProcessing: boolean;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ schema, isProcessing }) => {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCopy = () => {
    if (schema?.content) {
      navigator.clipboard.writeText(schema.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (schema?.content) {
      const blob = new Blob([schema.content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'api-schema.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`flex flex-col h-full transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <CodeBracket className="h-5 w-5 text-blue-500" />
          API Schema Output
        </h2>
        
        <div className="flex space-x-2">
          <button 
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${!schema ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : ''}`}
            onClick={handleCopy}
            disabled={!schema}
            title="Copy to clipboard"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
          
          <button 
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${!schema ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : ''}`}
            onClick={handleDownload}
            disabled={!schema}
            title="Download schema"
          >
            <Download className="h-4 w-4" />
          </button>
          
          <button 
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${!schema ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : ''}`}
            onClick={toggleFullscreen}
            disabled={!schema}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {isProcessing && !schema && (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Generating your API schema...</p>
          </div>
        )}
        
        {!isProcessing && !schema && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <CodeBracket className="h-8 w-8 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Schema Generated Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Describe your API needs in the prompt box on the left, and your generated schema will appear here.
            </p>
          </div>
        )}
        
        {schema && <SchemaDisplay schema={schema} />}
      </div>
    </div>
  );
};

export default OutputPanel;