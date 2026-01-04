import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoom, addBooking as addBookingApi } from '../api';
import { getErrorMessage } from '../helpers';

export const useRoom = (id) => {
	const navigate = useNavigate();
	const [room, setRoom] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return;

		const load = async () => {
			setLoading(true);
			setError(null);

			try {
				const res = await getRoom(id);
				setRoom(res.data);
			} catch (error) {
				setError(getErrorMessage(error));
				setRoom(null);
			} finally {
				setLoading(false);
			}
		};

		load();
	}, [id]);

	const addBooking = async (user, adults, checkIn, checkOut) => {
		setLoading(true);
		setError(null);

		try {
			const res = await addBookingApi(id, user, adults, checkIn, checkOut);

			if (res.status === 201) navigate('/reservations');
		} catch (error) {
			setError(getErrorMessage(error));
		} finally {
			setLoading(false);
		}
	};

	return { addBooking, room, loading, error };
};
