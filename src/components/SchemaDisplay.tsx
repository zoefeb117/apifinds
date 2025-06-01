import React from 'react';
import { Schema } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SchemaDisplayProps {
  schema: Schema;
}

const SchemaDisplay: React.FC<SchemaDisplayProps> = ({ schema }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6">
        <div className="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                // ───────────────────────────────────────────────────────────────────────────
                // 1) If `inline === true`, it is a single‐backtick snippet.
                //    Return exactly the old light‐gray/dark‐gray <code> styling:
                if (inline) {
                  return (
                    <code
                      className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-gray-900 dark:text-gray-100"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }

                // ───────────────────────────────────────────────────────────────────────────
                // 2) At this point, we know `inline === false`, so it’s a fenced block.
                //    Try to find a "language-xyz" class name:
                const match = /language-([\w-]+)/.exec(className || '');

                // 2a) If match !== null, it's a fenced block with an explicit language.
                //     Render the SyntaxHighlighter with a label (same as your old version):
                if (match) {
                  const lang = match[1];
                  return (
                    <div className="relative rounded-lg overflow-hidden my-4">
                      <div className="absolute top-0 right-0 px-4 py-1 text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-800 dark:bg-gray-900 rounded-bl-lg">
                        {lang}
                      </div>
                      <SyntaxHighlighter
                        style={oneDark}
                        language={lang}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          padding: '1.5rem',
                          borderRadius: '0.5rem',
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  );
                }

                // 2b) If match === null, it’s a fenced block **without** a language tag.
                //     Now we want it to be a dark block (SyntaxHighlighter) **with no label**:
                return (
                  <div className="relative rounded-lg overflow-hidden my-4">
                    <SyntaxHighlighter
                      style={oneDark}
                      // Passing `language={null}` means “no explicit language”
                      language={null}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                );
              },

              // ───────────────────────────────────────────────────────────────────────────
              // (Other Markdown elements remain unchanged)
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mb-4 mt-6">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mb-3 mt-5">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>
              ),
              p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-blue-500 hover:text-blue-600 underline">
                  {children}
                </a>
              ),
            }}
          >
            {schema.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default SchemaDisplay;