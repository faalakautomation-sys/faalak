// Frontend API client - connects to backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Submit a call request to the backend
 */
export async function submitCallRequest(name, phoneNumber, email = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/call-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phoneNumber, email }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error submitting call request:', error);
    throw error;
  }
}

/**
 * Subscribe an email address to newsletter updates
 */
export async function subscribeToNewsletter(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `API error: ${response.status}`);
    return data;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
}

/**
 * Save a chat message to the backend
 */
export async function saveChatMessage(sessionId, sender, message) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, sender, message }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error saving chat message:', error);
    throw error;
  }
}

/**
 * Get chat messages for a session
 */
export async function getChatMessages(sessionId) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat-messages/${sessionId}`);

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
}

/**
 * Check if backend is running
 */
export async function healthCheck() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'error', message: error.message };
  }
}

export default {
  submitCallRequest,
  subscribeToNewsletter,
  saveChatMessage,
  getChatMessages,
  healthCheck,
};
