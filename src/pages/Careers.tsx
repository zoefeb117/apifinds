import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Briefcase, MapPin, Clock, DollarSign, Rocket, Heart, Brain, Users } from 'lucide-react';

const Careers: React.FC = () => {
  const positions = [
    {
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$120K - $180K"
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130K - $170K"
    },
    {
      title: "Developer Advocate",
      department: "Developer Relations",
      location: "Remote",
      type: "Full-time",
      salary: "$100K - $150K"
    }
  ];

  const benefits = [
    {
      icon: <Rocket className="h-6 w-6 text-indigo-500" />,
      title: "Career Growth",
      description: "Clear career progression and learning opportunities"
    },
    {
      icon: <Heart className="h-6 w-6 text-indigo-500" />,
      title: "Health & Wellness",
      description: "Comprehensive health coverage and wellness programs"
    },
    {
      icon: <Brain className="h-6 w-6 text-indigo-500" />,
      title: "Learning Budget",
      description: "$2,500 annual budget for professional development"
    },
    {
      icon: <Users className="h-6 w-6 text-indigo-500" />,
      title: "Remote Culture",
      description: "Flexible work environment with global team events"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Help us build the future of API integration. We're looking for passionate individuals to join our growing team.
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Why Join Velkros?</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
            <div className="space-y-6">
              {positions.map((position) => (
                <div
                  key={position.title}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {position.department}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {position.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {position.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {position.salary}
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors">
                      Apply Now
                    </button>
                  </div>
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

export default Careers;