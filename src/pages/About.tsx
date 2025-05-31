import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Building2, Users, Globe, Award } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'APIs Integrated', value: '1000+' },
    { label: 'Active Developers', value: '50K+' },
    { label: 'Countries', value: '150+' },
    { label: 'Success Rate', value: '99.9%' }
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      title: "Developer First",
      description: "We build tools that developers love, focusing on simplicity and efficiency."
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-500" />,
      title: "Global Reach",
      description: "Supporting developers worldwide with reliable and scalable solutions."
    },
    {
      icon: <Award className="h-8 w-8 text-indigo-500" />,
      title: "Excellence",
      description: "Committed to delivering the highest quality tools and services."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">About Velkros</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're on a mission to simplify API integration and empower developers to build better applications faster.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-indigo-500 mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <div className="mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Founded in 2025, Velkros emerged from a simple observation: developers spend too much time figuring out API integrations. We set out to create a platform that would make API integration as simple as having a conversation.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Today, we're proud to serve developers worldwide, helping them build better applications faster. Our platform continues to evolve, driven by our commitment to innovation and our community's feedback.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "CEO & Co-founder",
                  image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                {
                  name: "Michael Rodriguez",
                  role: "CTO & Co-founder",
                  image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                {
                  name: "Emma Thompson",
                  role: "Head of Product",
                  image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;