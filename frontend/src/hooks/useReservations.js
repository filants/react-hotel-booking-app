import { useState, useEffect, useCallback } from 'react';
import {
	getReservations as getReservationsApi,
	deleteReservation as deleteReservationApi,
} from '../api';
import { getErrorMessage } from '../helpers';

export const useReservations = () => {
	const [reservations, setReservations] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const load = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const res = await getReservationsApi();
			setReservations(res.data);
		} catch (error) {
			setReservations([]);
			setError(getErrorMessage(error));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const deleteReservation = useCallback(
		async (reservationId) => {
			setLoading(true);
			setError(null);

			try {
				await deleteReservationApi(reservationId);
				await load();
			} catch (error) {
				setError(getErrorMessage(error));
				setLoading(false);
			}
		},
		[load],
	);

	return { reservations, deleteReservation, error, loading };
};
