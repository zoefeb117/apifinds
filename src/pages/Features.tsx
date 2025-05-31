import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Sparkles, Zap, Shield, Globe, Code, MessageSquare } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-indigo-500" />,
      title: "Natural Language API Discovery",
      description: "Simply describe what you need, and we'll find the perfect APIs for your project. Our AI understands your requirements and matches them with the best solutions.",
      benefits: [
        "Instant API recommendations",
        "Context-aware suggestions",
        "Alternative options comparison"
      ]
    },
    {
      icon: <Code className="h-8 w-8 text-indigo-500" />,
      title: "Smart Integration Guides",
      description: "Get detailed, step-by-step integration instructions tailored to your specific use case and tech stack.",
      benefits: [
        "Custom code snippets",
        "Best practices included",
        "Framework-specific guides"
      ]
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      title: "Security First Approach",
      description: "Built-in security best practices and recommendations to ensure your integrations are secure from day one.",
      benefits: [
        "Authentication handling",
        "Data encryption",
        "Security compliance"
      ]
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-500" />,
      title: "Comprehensive API Coverage",
      description: "Access a vast library of APIs across multiple categories and use cases.",
      benefits: [
        "Payment processing",
        "Authentication services",
        "Cloud storage solutions"
      ]
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-indigo-500" />,
      title: "Real-time Support",
      description: "Get help when you need it with our integrated support system and community.",
      benefits: [
        "24/7 chat support",
        "Community forums",
        "Expert assistance"
      ]
    },
    {
      icon: <Zap className="h-8 w-8 text-indigo-500" />,
      title: "Performance Optimization",
      description: "Ensure your integrations are fast and efficient with built-in performance monitoring and optimization tips.",
      benefits: [
        "Response time tracking",
        "Cache optimization",
        "Load balancing suggestions"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Features</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover how Velkros makes API integration simpler, faster, and more secure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Features;