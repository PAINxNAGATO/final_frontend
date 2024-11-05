import axios from 'axios';


// Set baseURL using environment variable
const API_BASE_URL = 'https://final-six-beta.vercel.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  // any other Axios settings you need
});

export default api;
