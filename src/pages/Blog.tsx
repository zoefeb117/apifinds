import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const posts = [
    {
      title: 'Getting Started with API Integration',
      excerpt: 'Learn how to quickly integrate third-party APIs into your application using Velkros. We\'ll walk through the entire process from API discovery to implementation.',
      date: '2025-03-15',
      readTime: '5 min read',
      author: 'Sarah Chen',
      category: 'Tutorial',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Best Practices for API Security',
      excerpt: 'Discover the essential security measures you need to implement when working with external APIs. From authentication to data encryption, we cover it all.',
      date: '2025-03-10',
      readTime: '8 min read',
      author: 'Michael Rodriguez',
      category: 'Security',
      image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'The Future of API Integration',
      excerpt: 'Explore upcoming trends and innovations in API integration and how they will shape development. From AI-powered discovery to automated testing.',
      date: '2025-03-05',
      readTime: '6 min read',
      author: 'Emma Thompson',
      category: 'Industry Trends',
      image: 'https://images.pexels.com/photos/8728285/pexels-photo-8728285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-black dark:text-white mr-4" />
              <h1 className="text-3xl font-bold">Blog</h1>
            </div>
            
            <div className="flex gap-4">
              <select className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2">
                <option>All Categories</option>
                <option>Tutorials</option>
                <option>Security</option>
                <option>Industry Trends</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.title} className="bg-white dark:bg-black rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="mx-2">•</span>
                    <time>{post.readTime}</time>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{post.author}</span>
                    </div>
                    
                    <button className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 font-medium flex items-center">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg font-medium transition-colors">
              Load More Posts
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;