const N8N_WEBHOOK_URL = 'https://butterflowy.app.n8n.cloud/webhook/2ee1be6b-87e7-4032-bf18-0e93ddc703a4';

export const streamChat = async (
  prompt: string,
  sessionId: string | null,
  output: string = ''
): Promise<{ sessionId: string; result: string }> => {
  // build exactly { prompt, output } 
  const payload: Record<string, any> = { prompt, output };
  // if you still need session-tracking, you can include it
  if (sessionId) payload.sessionId = sessionId;

  const res = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  // your n8n returns { text: '...markdown...' }
  const result = typeof data.text === 'string' ? data.text : '';

  return {
    sessionId: sessionId ?? Date.now().toString(),
    result
  };
};