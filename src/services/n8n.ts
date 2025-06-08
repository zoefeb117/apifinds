const N8N_WEBHOOK_URL = 'https://butterflowy.app.n8n.cloud/webhook/2ee1be6b-87e7-4032-bf18-0e93ddc703a4';

export const streamChat = async (
  message: string,
  sessionId: string | null,
  onToken: (token: string) => void,
  currentOutput?: string
): Promise<{ sessionId: string; result: string }> => {
  try {
    // Prepare request body as JSON
    const requestBody = {
      prompt: message,
      currentOutput: currentOutput || '',
      ...(sessionId && { sessionId })
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response - adjust this based on your n8n workflow output structure
    const result = data.response || data.output || data.result || '';
    const newSessionId = data.sessionId || sessionId || Date.now().toString();

    // Send the complete result at once instead of streaming
    onToken(result);

    return {
      sessionId: newSessionId,
      result
    };
  } catch (error) {
    console.error('Error in n8n workflow request:', error);
    throw error;
  }
};