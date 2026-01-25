import { useState, useEffect, useCallback } from 'react';
import {
	getReservations as getReservationsApi,
	deleteReservation as deleteReservationApi,
} from '../api';
import { getErrorMessage } from '../helpers';

export const useReservations = () => {
	const [reservations, setReservations] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const load = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const res = await getReservationsApi(page);
			setReservations(res.data.reservations);
			setLastPage(res.data.lastPage);
		} catch (error) {
			setReservations([]);
			setError(getErrorMessage(error));
		} finally {
			setLoading(false);
		}
	}, [page]);

	useEffect(() => {
		console.log('Reservations mounted');
		load();
		return () => console.log('Reservations unmounted');
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

	return { reservations, page, setPage, lastPage, deleteReservation, error, loading };
};
