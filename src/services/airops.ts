const AGENT_ID = 'aa3e5660-4e0a-430c-a416-9526d2792f12';
const API_KEY = 'gd0aNXrb1P99AU0ITfuFsAjfCT2B9bu6B-mtGg5BFpCzBJJdEMHv9DS93oe8';
const API_URL = `https://api.airops.com/public_api/agent_apps/${AGENT_ID}/chat`;

export const streamChat = async (
  message: string,
  sessionId: string | null,
  onToken: (token: string) => void
): Promise<{ sessionId: string; result: string }> => {
  try {
    console.log('Sending chat request:', { message, sessionId });
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'text/event-stream'
      },
      body: JSON.stringify({
        message,
        ...(sessionId && { session_id: sessionId })
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    let completeResponse = '';
    let receivedSessionId = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      console.log('Received chunk:', chunk);
      
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const data = JSON.parse(line);
          console.log('Parsed data:', data);
          
          if (data.session_id && !receivedSessionId) {
            receivedSessionId = data.session_id;
            console.log('Received session ID:', receivedSessionId);
          }
          
          if (data.token) {
            onToken(data.token);
            completeResponse += data.token;
          }
        } catch (e) {
          console.debug('Error parsing chunk:', e);
        }
      }
    }

    console.log('Stream completed. Final response:', completeResponse);
    
    return {
      sessionId: receivedSessionId || sessionId || '',
      result: completeResponse
    };
  } catch (error) {
    console.error('Error in chat stream:', error);
    throw error;
  }
};