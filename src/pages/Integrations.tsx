import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { CreditCard, MessageSquare, Cloud, Lock, Mail, BarChart as ChartBar } from 'lucide-react';

const Integrations: React.FC = () => {
  const categories = [
    {
      icon: <CreditCard className="h-8 w-8 text-indigo-500" />,
      title: "Payment Processing",
      description: "Integrate popular payment gateways and processing solutions.",
      platforms: ["Stripe", "PayPal", "Square", "Braintree"]
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-indigo-500" />,
      title: "Communication",
      description: "Add messaging and communication features to your app.",
      platforms: ["Twilio", "SendBird", "PubNub", "MessageBird"]
    },
    {
      icon: <Cloud className="h-8 w-8 text-indigo-500" />,
      title: "Cloud Storage",
      description: "Connect with cloud storage and file management services.",
      platforms: ["AWS S3", "Google Cloud Storage", "Dropbox", "Box"]
    },
    {
      icon: <Lock className="h-8 w-8 text-indigo-500" />,
      title: "Authentication",
      description: "Implement secure user authentication and authorization.",
      platforms: ["Auth0", "Okta", "Firebase Auth", "Microsoft Azure AD"]
    },
    {
      icon: <Mail className="h-8 w-8 text-indigo-500" />,
      title: "Email Services",
      description: "Send transactional and marketing emails reliably.",
      platforms: ["SendGrid", "Mailchimp", "Postmark", "Amazon SES"]
    },
    {
      icon: <ChartBar className="h-8 w-8 text-indigo-500" />,
      title: "Analytics",
      description: "Track and analyze user behavior and app performance.",
      platforms: ["Google Analytics", "Mixpanel", "Amplitude", "Segment"]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Available Integrations</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse our extensive collection of pre-built integrations and APIs across various categories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="mb-6">{category.icon}</div>
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.platforms.map((platform, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full text-sm"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Integrations;