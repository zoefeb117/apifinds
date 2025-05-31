import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Calendar } from 'lucide-react';

const Blog: React.FC = () => {
  const posts = [
    {
      title: 'Getting Started with API Integration',
      excerpt: 'Learn how to quickly integrate third-party APIs into your application using Velkros.',
      date: '2025-03-15',
      readTime: '5 min read'
    },
    {
      title: 'Best Practices for API Security',
      excerpt: 'Discover the essential security measures you need to implement when working with external APIs.',
      date: '2025-03-10',
      readTime: '8 min read'
    },
    {
      title: 'The Future of API Integration',
      excerpt: 'Explore upcoming trends and innovations in API integration and how they will shape development.',
      date: '2025-03-05',
      readTime: '6 min read'
    }
  ];

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

        <div className="flex items-center mb-12">
          <BookOpen className="h-8 w-8 text-indigo-500 mr-4" />
          <h1 className="text-3xl font-bold">Blog</h1>
        </div>

        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.title} className="border-b border-gray-200 dark:border-gray-700 pb-8">
              <h2 className="text-2xl font-bold mb-4 hover:text-indigo-500 cursor-pointer">
                {post.title}
              </h2>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <time>{post.date}</time>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </p>
              <button className="text-indigo-500 hover:text-indigo-600 font-medium">
                Read More →
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;