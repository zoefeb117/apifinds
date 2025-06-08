// Mock n8n service for development when n8n server is not available
const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/2ee1be6b-87e7-4032-bf18-0e93ddc703a4';

// Check if we're in development and n8n is not available
const isN8nAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, { 
      method: 'HEAD',
      signal: AbortSignal.timeout(2000) // 2 second timeout
    });
    return response.ok;
  } catch {
    return false;
  }
};

// Mock response for development
const mockStreamChat = async (
  message: string,
  sessionId: string | null,
  onToken: (token: string) => void,
  currentOutput?: string
): Promise<{ sessionId: string; result: string }> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate a mock response based on the input
  const mockResponse = `I received your message: "${message}". This is a mock response since the n8n workflow is not available. The system is working correctly and ready to connect to your n8n instance when it's running.`;
  
  const newSessionId = sessionId || Date.now().toString();
  
  // Simulate streaming response
  const tokens = mockResponse.split('');
  for (const token of tokens) {
    onToken(token);
    await new Promise(resolve => setTimeout(resolve, 20)); // Slower for more realistic streaming
  }
  
  return {
    sessionId: newSessionId,
    result: mockResponse
  };
};

export const streamChat = async (
  message: string,
  sessionId: string | null,
  onToken: (token: string) => void,
  currentOutput?: string
): Promise<{ sessionId: string; result: string }> => {
  try {
    // First check if n8n is available
    const n8nAvailable = await isN8nAvailable();
    
    if (!n8nAvailable) {
      console.warn('n8n server not available, using mock response');
      return await mockStreamChat(message, sessionId, onToken, currentOutput);
    }

    // Prepare query parameters for real n8n request
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
    // Fallback to mock response if real n8n fails
    console.warn('Falling back to mock response due to n8n error');
    return await mockStreamChat(message, sessionId, onToken, currentOutput);
  }
};