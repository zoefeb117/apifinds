import React, { useState } from 'react';
import { Schema } from '../types';
import { Code, Copy, Check, Download, Maximize2, Minimize2 } from 'lucide-react';
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
    <div className={`flex flex-col h-full transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      <div className="p-6 border-b border-border bg-card/50 flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Code className="h-5 w-5 text-primary" />
          </div>
          API Schema Output
        </h2>
        
        <div className="flex space-x-2">
          <button 
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              !schema 
                ? 'text-muted-foreground cursor-not-allowed' 
                : 'hover:bg-muted text-foreground'
            }`}
            onClick={handleCopy}
            disabled={!schema}
            title="Copy to clipboard"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </button>
          
          <button 
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              !schema 
                ? 'text-muted-foreground cursor-not-allowed' 
                : 'hover:bg-muted text-foreground'
            }`}
            onClick={handleDownload}
            disabled={!schema}
            title="Download schema"
          >
            <Download className="h-4 w-4" />
          </button>
          
          <button 
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              !schema 
                ? 'text-muted-foreground cursor-not-allowed' 
                : 'hover:bg-muted text-foreground'
            }`}
            onClick={toggleFullscreen}
            disabled={!schema}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        {isProcessing && !schema && (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-muted rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
            </div>
            <p className="text-muted-foreground font-medium">Generating your API schema...</p>
          </div>
        )}
        
        {!isProcessing && !schema && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
              <Code className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 tracking-tight">No Schema Generated Yet</h3>
            <p className="text-muted-foreground max-w-md leading-relaxed">
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