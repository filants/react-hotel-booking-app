import api from './client';

export const apiRegister = async (email, password) =>
	api.post('auth/register', { email, password });

export const apiLogin = async (email, password) =>
	api.post('auth/login', { email, password });

export const apiLogout = () => api.post('auth/logout');

export const apiMe = () => api.get('auth/me');
