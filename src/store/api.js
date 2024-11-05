// api.js
const BASE_URL = 'https://final-wheat-three.vercel.app';

const fetchWithConfig = async (endpoint, options = {}) => {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Clean endpoint to prevent double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  try {
    const response = await fetch(`${BASE_URL}/${cleanEndpoint}`, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP error! status: ${response.status}`
      }));
      throw new Error(errorData.message || 'Request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

const api = {
  get: (endpoint) => fetchWithConfig(endpoint, { method: 'GET' }),
  post: (endpoint, data) => fetchWithConfig(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  delete: (endpoint) => fetchWithConfig(endpoint, { method: 'DELETE' }),
};

export default api;