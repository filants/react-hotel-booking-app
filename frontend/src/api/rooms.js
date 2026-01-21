import axios from 'axios';
const API = 'http://localhost:3001/api/rooms';

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

	return axios.get(`${API}?${params.toString()}`);
};

export const getRoom = async (id) => axios.get(`${API}/${id}`);

export const createRoom = async (formData) =>
	axios.post(`${API}`, formData, {
		withCredentials: true,
		headers: { 'Content-Type': 'multipart/form-data' },
	});

export const updateRoom = async (id, formData) =>
	axios.put(`${API}/${id}`, formData, {
		withCredentials: true,
	});

export const addBooking = async (id, user, adults, checkIn, checkOut) =>
	axios.post(`${API}/${id}`, { user, adults, checkIn, checkOut });

export const getReservations = async (page = 1) =>
	axios.get(`${API}/reservations?page=${page}`);

export const deleteReservation = async (reservationId) =>
	axios.delete(`${API}/reservations/${reservationId}`, {
		withCredentials: true,
	});
