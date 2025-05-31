import AirOps from '@airops/airops-js';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';

const WORKSPACE_ID = '20396';
const AGENT_ID = 'aa3e5660-4e0a-430c-a416-9526d2792f12';
const API_KEY = 'gd0aNXrb1P99AU0ITfuFsAjfCT2B9bu6B-mtGg5BFpCzBJJdEMHv9DS93oe8';

// Generate a unique user ID for the session
const USER_ID = `user_${Math.random().toString(36).substring(2)}`;

// Hash the user ID using the API key
const hashUserId = (userId: string) => {
  const hash = HmacSHA256(userId, API_KEY);
  return hash.toString(Hex);
};

const HASHED_USER_ID = hashUserId(USER_ID);

// Initialize AirOps SDK
const airops = new AirOps();

export const initializeChat = async (message: string, onToken: (token: string) => void) => {
  try {
    const response = await airops.apps.chatStream({
      appId: AGENT_ID,
      message,
      inputs: {},
      streamCallback: ({ action, ...data }) => {
        if (action === 'agent-response' && 'token' in data) {
          onToken(data.token);
        }
      },
      streamCompletedCallback: (data) => {
        console.log('Chat completed:', data);
      }
    });

    const result = await response.result();
    return {
      sessionId: response.sessionId,
      result: result.result
    };
  } catch (error) {
    console.error('Error in chat:', error);
    throw error;
  }
};

export const continueChatSession = async (
  message: string, 
  sessionId: string,
  onToken: (token: string) => void
) => {
  try {
    const response = await airops.apps.chatStream({
      appId: AGENT_ID,
      message,
      sessionId,
      inputs: {},
      streamCallback: ({ action, ...data }) => {
        if (action === 'agent-response' && 'token' in data) {
          onToken(data.token);
        }
      },
      streamCompletedCallback: (data) => {
        console.log('Chat completed:', data);
      }
    });

    const result = await response.result();
    return {
      sessionId: response.sessionId,
      result: result.result
    };
  } catch (error) {
    console.error('Error in chat:', error);
    throw error;
  }
};