import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';

interface IntercomUser {
  id?: string;
  name?: string;
  email?: string;
  createdAt?: number;
}

export const useIntercom = (user?: IntercomUser) => {
  useEffect(() => {
    // Initialize Intercom with your app ID
    const intercomConfig: any = {
      app_id: 'ytsn9b64',
    };

    // Add user data if provided
    if (user) {
      if (user.id) intercomConfig.user_id = user.id;
      if (user.name) intercomConfig.name = user.name;
      if (user.email) intercomConfig.email = user.email;
      if (user.createdAt) intercomConfig.created_at = user.createdAt;
    }

    // Initialize Intercom
    Intercom(intercomConfig);

    // Cleanup function to shutdown Intercom when component unmounts
    return () => {
      if (window.Intercom) {
        window.Intercom('shutdown');
      }
    };
  }, [user]);

  // Return utility functions for Intercom
  return {
    show: () => window.Intercom && window.Intercom('show'),
    hide: () => window.Intercom && window.Intercom('hide'),
    showMessages: () => window.Intercom && window.Intercom('showMessages'),
    showNewMessage: (message?: string) => window.Intercom && window.Intercom('showNewMessage', message),
    update: (data: any) => window.Intercom && window.Intercom('update', data),
  };
};