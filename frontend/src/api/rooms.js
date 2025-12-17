import axios from 'axios';
const API = 'http://localhost:3001/api/rooms';

export const getRooms = async (roomCategory, checkIn, checkOut) =>
	axios.get(
		`${API}?roomCategory=${roomCategory}&checkIn=${checkIn}&checkOut=${checkOut}`,
	);
