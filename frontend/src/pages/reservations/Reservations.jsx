import { useState } from 'react';
import {
	Title,
	EmptyPageMessage,
	Loader,
	Card,
	FullPageContainer,
	Pagination,
} from '../../components';
import { useReservations } from '../../hooks/useReservations';
import styled from 'styled-components';

const ReservationsContainer = ({ className }) => {
	const { reservations, page, lastPage, setPage, deleteReservation, error, loading } =
		useReservations();
	const [deletingId, setDeletingId] = useState(null);

	const handleDelete = async (reservationId) => {
		setDeletingId(reservationId);
		await deleteReservation(reservationId);
		setDeletingId(null);
	};

	if (loading) return <Loader />;
	if (error) return <EmptyPageMessage>{error}</EmptyPageMessage>;

	return (
		<div className={className}>
			<FullPageContainer>
				<Title>My reservations</Title>
				{!reservations.length ? (
					<EmptyPageMessage>No reservations yet...</EmptyPageMessage>
				) : (
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
