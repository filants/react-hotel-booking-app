import axios from 'axios';

// Centralized axios client to ensure credentials (cookies) are sent with every request
// and to avoid repeating configuration across API modules
const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
	withCredentials: true,
});

export default api;
