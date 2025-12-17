import { useState } from 'react';
import { Loader, Card, Title, SearchForm } from '../../components';
import { useRooms } from '../../hooks/useRooms';
import { useRoomCategories } from '../../hooks/useRoomCategories';
import { getDate } from '../../helpers';
import styled from 'styled-components';

const HomeContainer = ({ className }) => {
	const { todayDate, tomorrowDate } = getDate();
	const { getAvailableRooms, rooms, setRooms, loading } = useRooms();
	const { roomCategories } = useRoomCategories();
	const [checkIn, setCheckIn] = useState(todayDate);
	const [checkOut, setCheckOut] = useState(tomorrowDate);
	const [adults, setAdults] = useState(1);
	const [kids, setKids] = useState(0);
	const [roomCategory, setRoomCategory] = useState('all');

	const handleSubmit = async (e) => {
		e.preventDefault();

		await getAvailableRooms(roomCategory, checkIn, checkOut);
	};

	if (loading) return <Loader />;

	return (
		<div className={className}>
			{!rooms ? (
				<SearchForm
					handleSubmit={handleSubmit}
					checkIn={checkIn}
					setCheckIn={setCheckIn}
					todayDate={todayDate}
					checkOut={checkOut}
					setCheckOut={setCheckOut}
					adults={adults}
					setAdults={setAdults}
					kids={kids}
					setKids={setKids}
					roomCategories={roomCategories}
					roomCategory={roomCategory}
					setRoomCategory={setRoomCategory}
				/>
			) : (
				<div className="search-results">
					<Title
						edit={true}
						searchReset={() => setRooms(null)}
						checkIn={checkIn}
						checkOut={checkOut}
						adults={adults}
						roomCategory={roomCategory}
						roomCategories={roomCategories}
					>
						Available rooms
					</Title>
					{!rooms?.length ? (
						<div>Nonthing available on chosen dates...</div>
					) : (
						<div className="rooms-container">
							{rooms.map((room) => (
								<Card room={room} key={room._id} />
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export const Home = styled(HomeContainer)`
	& .search-results {
		padding: 40px;
	}
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
