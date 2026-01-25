import api from './client';

export const getRoomCategories = () => api.get('/api/room-categories');
