import { useState } from 'react';
import { Title, EmptyPageMessage, Loader, Card } from '../../components';
import { useReservations } from '../../hooks/useReservations';
import styled from 'styled-components';

const ReservationsContainer = ({ className }) => {
	const { reservations, deleteReservation, error, loading } = useReservations();
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
			<Title>My reservations</Title>
			{!reservations.length ? (
				<EmptyPageMessage>No reservations yet...</EmptyPageMessage>
			) : (
				<div className="rooms-container">
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
		</div>
	);
};

export const Reservations = styled(ReservationsContainer)`
	padding: 40px;
	& .rooms-container {
		display: grid;
		gap: 30px;
		grid-template-columns: repeat(1, 1fr);
		@media (min-width: 700px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media (min-width: 1200px) {
			grid-template-columns: repeat(4, 1fr);
		}
	}
`;
