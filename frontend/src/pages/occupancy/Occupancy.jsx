import { useEffect } from 'react';
import { Title, FullPageContainer, Card } from '../../components';
import { useRooms } from '../../hooks/useRooms';
import { formattedDate } from '../../helpers';

export const Occupancy = () => {
	const { getAvailableRooms, rooms } = useRooms();

	useEffect(() => {
		getAvailableRooms();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const isAvailable = (bookings) => {
		const hasOverlap = bookings.some((booking) => {
			const currentDate = new Date();
			const bookingStart = new Date(booking.checkIn);
			const bookingEnd = new Date(booking.checkOut);

			return bookingStart < currentDate && currentDate < bookingEnd;
		});

		return !hasOverlap;
	};

	return (
		<FullPageContainer>
			<Title>Hotel occupancy – {formattedDate(new Date())}</Title>
			<div className="cards-container">
				{rooms?.map((room) => (
					<Card
						key={room._id}
						room={room}
						available={isAvailable(room.bookings)}
						variant="availability"
					/>
				))}
			</div>
		</FullPageContainer>
	);
};
