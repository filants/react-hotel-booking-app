import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchAvailableRooms,
	setPage as setRoomsPage,
} from '../../store/slices/roomsSlice';
import {
	Title,
	FullPageContainer,
	Card,
	Pagination,
	Loader,
	EmptyPageMessage,
} from '../../components';
import { formattedDate } from '../../helpers';

export const Occupancy = () => {
	const dispatch = useDispatch();
	const { rooms, page, lastPage, loading, error } = useSelector((s) => s.rooms);
	const setPage = (newPage) => dispatch(setRoomsPage(newPage));

	const roomsArray = Array.isArray(rooms) ? rooms : [];

	useEffect(() => {
		dispatch(fetchAvailableRooms({ page }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const isAvailable = (bookings) => {
		const hasOverlap = bookings.some((booking) => {
			const currentDate = new Date();
			const bookingStart = new Date(booking.checkIn);
			const bookingEnd = new Date(booking.checkOut);

			return bookingStart < currentDate && currentDate < bookingEnd;
		});

		return !hasOverlap;
	};

	if (error) return <EmptyPageMessage>{error}</EmptyPageMessage>;

	return (
		<FullPageContainer>
			<Title>Hotel occupancy – {formattedDate(new Date())}</Title>

			{loading && <Loader />}

			{!loading && roomsArray.length > 0 && (
				<div className="cards-container">
					{roomsArray.map((room) => (
						<Card
							key={room._id}
							room={room}
							available={isAvailable(room.bookings)}
							variant="availability"
						/>
					))}
				</div>
			)}
			<Pagination page={page} lastPage={lastPage} setPage={setPage} />
		</FullPageContainer>
	);
};
