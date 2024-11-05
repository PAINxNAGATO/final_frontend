const BASE_URL = 'https://final-wheat-three.vercel.app';

const fetchWithConfig = async (endpoint, options = {}) => {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  // For DELETE requests, we might not have a response body
  if (options.method === 'DELETE') {
    return null;
  }

  return response.json();
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