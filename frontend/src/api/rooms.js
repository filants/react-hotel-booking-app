import api from './client';
const API = '/api/rooms';

export const getAvailableRooms = ({
	roomCategory = 'all',
	checkIn,
	checkOut,
	page = 1,
} = {}) => {
	const params = new URLSearchParams();

	params.set('roomCategory', roomCategory);
	if (checkIn) params.set('checkIn', checkIn);
	if (checkOut) params.set('checkOut', checkOut);
	params.set('page', String(page));

	return api.get(`${API}?${params.toString()}`);
};

export const getRoom = async (id) => api.get(`${API}/${id}`);

export const createRoom = async (formData) =>
	api.post(`${API}`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

export const updateRoom = async (id, formData) => api.put(`${API}/${id}`, formData);

export const addBooking = async (id, user, adults, checkIn, checkOut) =>
	api.post(`${API}/${id}`, { user, adults, checkIn, checkOut });

export const getReservations = async (page = 1) =>
	api.get(`${API}/reservations?page=${page}`);

export const deleteReservation = async (reservationId) =>
	api.delete(`${API}/reservations/${reservationId}`);
