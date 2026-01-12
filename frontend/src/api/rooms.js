import axios from 'axios';
const API = 'http://localhost:3001/api/rooms';

export const getRooms = async (roomCategory, checkIn, checkOut) =>
	axios.get(
		`${API}?roomCategory=${roomCategory}&checkIn=${checkIn}&checkOut=${checkOut}`,
	);

export const getRoom = async (id) => axios.get(`${API}/${id}`);

export const createRoom = async (formData) =>
	axios.post(`${API}`, formData, {
		withCredentials: true,
		headers: { 'Content-Type': 'multipart/form-data' },
	});

export const addBooking = async (id, user, adults, checkIn, checkOut) =>
	axios.post(`${API}/${id}`, { user, adults, checkIn, checkOut });

export const getReservations = async () => axios.get(`${API}/reservations`);

export const deleteReservation = async (reservationId) =>
	axios.delete(`${API}/reservations/${reservationId}`, {
		withCredentials: true,
	});
