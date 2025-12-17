import { useState, useEffect } from 'react';
import { getRoomCategories } from '../api';

export const useRoomCategories = () => {
	const [roomCategories, setRoomCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const res = await getRoomCategories();

				setRoomCategories(res.data);
			} catch {
				setRoomCategories(null);
			} finally {
				setLoading(false);
			}
		};

		load();
	}, []);

	return { roomCategories, loading };
};
