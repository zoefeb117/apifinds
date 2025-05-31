const AGENT_ID = 'aa3e5660-4e0a-430c-a416-9526d2792f12';
const API_KEY = 'gd0aNXrb1P99AU0ITfuFsAjfCT2B9bu6B-mtGg5BFpCzBJJdEMHv9DS93oe8';
const API_URL = `https://api.airops.com/public_api/agent_apps/${AGENT_ID}/chat`;

export const streamChat = async (
  message: string,
  sessionId: string | null,
  onToken: (token: string) => void
): Promise<{ sessionId: string; result: string }> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        message,
        ...(sessionId && { session_id: sessionId })
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const result = data.output?.response || data.response || '';
    const newSessionId = data.session_id || sessionId || '';

    // Simulate streaming for non-streaming response
    const tokens = result.split('');
    for (const token of tokens) {
      onToken(token);
      await new Promise(resolve => setTimeout(resolve, 10)); // Small delay for smoother appearance
    }

    return {
      sessionId: newSessionId,
      result
    };
  } catch (error) {
    console.error('Error in chat stream:', error);
    throw error;
  }
};