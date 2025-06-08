const N8N_WEBHOOK_URL = 'https://butterflowy.app.n8n.cloud/webhook/2ee1be6b-87e7-4032-bf18-0e93ddc703a4';

export const streamChat = async (
  message: string,
  sessionId: string | null,
  onToken: (token: string) => void,
  currentOutput?: string
): Promise<{ sessionId: string; result: string }> => {
  try {
    // Prepare query parameters
    const params = new URLSearchParams({
      prompt: message,
      currentOutput: currentOutput || '',
      ...(sessionId && { sessionId })
    });

    const response = await fetch(`${N8N_WEBHOOK_URL}?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response - adjust this based on your n8n workflow output structure
    const result = data.response || data.output || data.result || '';
    const newSessionId = data.sessionId || sessionId || Date.now().toString();

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
    console.error('Error in n8n workflow request:', error);
    throw error;
  }
};