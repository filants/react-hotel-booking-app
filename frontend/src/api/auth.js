import axios from 'axios';
axios.defaults.withCredentials = true;
const API = 'http://localhost:3001/auth';

export const apiRegister = async (email, password) =>
	axios.post(`${API}/register`, { email, password });

export const apiLogin = async (email, password) =>
	axios.post(`${API}/login`, { email, password });

export const apiLogout = () => axios.post(`${API}/logout`);

export const apiMe = () => axios.get(`${API}/me`);
