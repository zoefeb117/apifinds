import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Building2, Shield, Users, Headphones, Server, Zap } from 'lucide-react';

const Enterprise: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      title: "Enterprise-grade Security",
      description: "Advanced security features including SSO, role-based access control, and audit logs."
    },
    {
      icon: <Server className="h-8 w-8 text-indigo-500" />,
      title: "On-premise Deployment",
      description: "Deploy Velkros within your own infrastructure for complete control and compliance."
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      title: "Team Collaboration",
      description: "Advanced team management features with custom roles and permissions."
    },
    {
      icon: <Headphones className="h-8 w-8 text-indigo-500" />,
      title: "Dedicated Support",
      description: "24/7 priority support with dedicated account management and technical assistance."
    },
    {
      icon: <Building2 className="h-8 w-8 text-indigo-500" />,
      title: "Custom Contracts",
      description: "Flexible contracts and pricing tailored to your organization's needs."
    },
    {
      icon: <Zap className="h-8 w-8 text-indigo-500" />,
      title: "Custom Development",
      description: "Custom feature development and integration support for your specific needs."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Enterprise Solutions</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Secure, scalable, and customizable API integration platform for large organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Integration Capabilities?</h2>
              <p className="text-xl mb-8 opacity-90">
                Let's discuss how Velkros can help your organization streamline API integrations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                  Contact Sales
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Enterprise;