import { useState } from 'react';
import { getRooms } from '../api';

export const useRooms = () => {
	const [rooms, setRooms] = useState(null);
	const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	const load = async () => {
	// 		try {
	// 			const res = await getRooms();

	// 			setRooms(res.data);
	// 		} catch {
	// 			setRooms(null);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	load();
	// }, []);

	const getAvailableRooms = async (roomCategory, checkIn, checkOut) => {
		setLoading(true);

		try {
			const res = await getRooms(roomCategory, checkIn, checkOut);

			setRooms(res.data);
		} catch {
			setRooms([]);
		} finally {
			setLoading(false);
		}
	};

	return { getAvailableRooms, rooms, setRooms, loading };
};
