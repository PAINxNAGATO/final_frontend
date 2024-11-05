import axios from 'axios';

// Set baseURL using environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  // any other Axios settings you need
});

export default api;
