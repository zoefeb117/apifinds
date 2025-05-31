import React from 'react';
import { Schema } from '../types';
import { CodeBracket } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface SchemaDisplayProps {
  schema: Schema;
}

const SchemaDisplay: React.FC<SchemaDisplayProps> = ({ schema }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{schema.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default SchemaDisplay;