import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions? We're here to help. Choose the best way to reach us below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Sales</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Other ways to reach us</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">support@velkros.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      We usually respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold mb-1">Live Chat</h3>
                    <p className="text-gray-600 dark:text-gray-400">Available 24/7 for quick support</p>
                    <button className="text-indigo-500 hover:text-indigo-600 text-sm mt-1">
                      Start a chat →
                    </button>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Mon-Fri, 9am-6pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Innovation Drive<br />
                      San Francisco, CA 94105<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;