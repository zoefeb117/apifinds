import { useState } from 'react';
import { ChatMessage, Schema } from '../types';

// Mock API integration recommendations
const mockRecommendations = {
  openapi: "3.0.0",
  info: {
    title: "Payment Integration APIs",
    description: "Recommended payment processing API endpoints for your e-commerce platform",
    version: "1.0.0"
  },
  paths: {
    "/stripe/payment-intents": {
      post: {
        summary: "Create payment intent",
        description: "Initializes a payment intent for processing a transaction",
        tags: ["Stripe"],
        responses: {
          "200": {
            description: "Payment intent created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PaymentIntent"
                }
              }
            }
          }
        }
      }
    },
    "/stripe/webhooks": {
      post: {
        summary: "Handle webhook events",
        description: "Endpoint for receiving Stripe webhook notifications",
        tags: ["Stripe"],
        responses: {
          "200": {
            description: "Webhook processed successfully"
          }
        }
      }
    },
    "/paypal/orders": {
      post: {
        summary: "Create PayPal order",
        description: "Creates a new PayPal order for checkout",
        tags: ["PayPal"],
        responses: {
          "201": {
            description: "Order created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PayPalOrder"
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      PaymentIntent: {
        type: "object",
        required: ["amount", "currency"],
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the payment intent"
          },
          amount: {
            type: "integer",
            description: "Amount in smallest currency unit (e.g., cents)"
          },
          currency: {
            type: "string",
            description: "Three-letter ISO currency code"
          },
          status: {
            type: "string",
            enum: ["requires_payment_method", "requires_confirmation", "succeeded"],
            description: "Current status of the payment intent"
          }
        }
      },
      PayPalOrder: {
        type: "object",
        required: ["intent", "purchase_units"],
        properties: {
          id: {
            type: "string",
            description: "PayPal order ID"
          },
          intent: {
            type: "string",
            enum: ["CAPTURE", "AUTHORIZE"],
            description: "Intent of the order"
          },
          status: {
            type: "string",
            enum: ["CREATED", "SAVED", "APPROVED", "VOIDED", "COMPLETED"],
            description: "Current status of the order"
          },
          purchase_units: {
            type: "array",
            items: {
              type: "object",
              properties: {
                amount: {
                  type: "object",
                  properties: {
                    currency_code: {
                      type: "string",
                      description: "Three-letter ISO currency code"
                    },
                    value: {
                      type: "string",
                      description: "Amount as a string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [schema, setSchema] = useState<Schema | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const sendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Simulate API recommendation generation
    setTimeout(() => {
      const systemMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `Based on your project description: "${content}", I've identified relevant payment processing APIs. You can find the recommended endpoints and integration details in the panel on the right.`,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, systemMessage]);
      
      setSchema({
        id: Date.now().toString(),
        content: JSON.stringify(mockRecommendations),
        version: 1,
        timestamp: new Date().toISOString()
      });
      
      setIsProcessing(false);
    }, 1500);
  };

  return {
    messages,
    schema,
    sendMessage,
    isProcessing
  };
};