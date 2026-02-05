import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteReservation,
	fetchReservations,
	setReservationsPage,
} from '../../store/slices/reservationsSlice';
import {
	Title,
	EmptyPageMessage,
	Loader,
	Card,
	FullPageContainer,
	Pagination,
} from '../../components';
import styled from 'styled-components';

const ReservationsContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { reservations, page, lastPage, loading, error } = useSelector(
		(s) => s.reservations,
	);
	const [deletingId, setDeletingId] = useState(null);

	useEffect(() => {
		dispatch(fetchReservations(page));
	}, [dispatch, page]);

	const handleDelete = async (reservationId) => {
		setDeletingId(reservationId);
		await dispatch(deleteReservation({ reservationId, page }));
		setDeletingId(null);
	};

	const setPage = (newPage) => dispatch(setReservationsPage(newPage));

	if (error) return <EmptyPageMessage>{error}</EmptyPageMessage>;

	return (
		<div className={className}>
			<FullPageContainer>
				<Title>My reservations</Title>

				{loading && <Loader />}

				{!loading && reservations.length === 0 && (
					<EmptyPageMessage>No reservations yet...</EmptyPageMessage>
				)}

				{!loading && reservations.length > 0 && (
					<div className="cards-container">
						{reservations.map((reservation) => (
							<Card
								key={reservation.booking._id}
								room={reservation}
								reservationState={reservation.booking}
								variant="reservation"
								handleDelete={handleDelete}
								deleting={deletingId === reservation.booking._id}
							/>
						))}
					</div>
				)}
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			</FullPageContainer>
		</div>
	);
};

export const Reservations = styled(ReservationsContainer)``;
