import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Check, CreditCard, Zap } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for side projects and experimentation',
      features: [
        'Up to 100 API requests/month',
        'Basic API recommendations',
        'Community support',
        'Public projects',
        'Basic integration guides'
      ]
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For professional developers and growing teams',
      features: [
        'Unlimited API requests',
        'Advanced recommendations',
        'Priority support',
        'Private projects',
        'Custom integrations',
        'Team collaboration',
        'Advanced security features',
        'API usage analytics'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'per month',
      description: 'For large organizations with custom needs',
      features: [
        'Everything in Pro',
        'Dedicated support',
        'Custom SLA',
        'On-premise deployment',
        'SSO integration',
        'Audit logs',
        'Custom contracts',
        'Training sessions'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <CreditCard className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the plan that best fits your needs. All plans include our core features.
              Upgrade or downgrade at any time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-black dark:ring-white' : 'border border-gray-200 dark:border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-black dark:text-white mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                        : 'bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="grid gap-8 mt-8">
              <div className="text-left">
                <h3 className="font-semibold mb-2">Can I change plans later?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.
                </p>
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-2">Do you offer a free trial?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, all paid plans come with a 14-day free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;