import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
	Loader,
	Card,
	Title,
	SearchForm,
	EmptyPageMessage,
	FullPageContainer,
} from '../../components';
import { useRooms } from '../../hooks/useRooms';
import { useRoomCategories } from '../../hooks/useRoomCategories';
import { getDate } from '../../helpers';
import styled from 'styled-components';

const HomeContainer = ({ className }) => {
	const location = useLocation();
	const preset = location.state;
	const { todayDate, tomorrowDate } = getDate();
	const { getAvailableRooms, rooms, setRooms, loading } = useRooms();
	const { roomCategories } = useRoomCategories();
	const [checkIn, setCheckIn] = useState(todayDate);
	const [checkOut, setCheckOut] = useState(tomorrowDate);
	const [adults, setAdults] = useState(1);
	const [kids, setKids] = useState(0);
	const [roomCategory, setRoomCategory] = useState('all');

	useEffect(() => {
		if (!preset) return;

		setCheckIn(preset.checkIn);
		setCheckOut(preset.checkOut);
		setAdults(preset.adults);
		setRoomCategory(preset.roomCategory);

		getAvailableRooms(preset.roomCategory, preset.checkIn, preset.checkOut);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [preset]);

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
				<FullPageContainer>
					<Title
						edit={true}
						clickEvent={() => setRooms(null)}
						checkIn={checkIn}
						checkOut={checkOut}
						adults={adults}
						roomCategory={roomCategory}
						roomCategories={roomCategories}
					>
						Available rooms
					</Title>
					{!rooms?.length ? (
						<EmptyPageMessage>
							Nonthing available on chosen dates...
						</EmptyPageMessage>
					) : (
						<div className="cards-container">
							{rooms.map((room) => (
								<Card
									key={room._id}
									room={room}
									variant="search"
									searchState={{
										checkIn,
										checkOut,
										adults,
										roomCategory,
										roomCategories,
									}}
								/>
							))}
						</div>
					)}
				</FullPageContainer>
			)}
		</div>
	);
};

export const Home = styled(HomeContainer)``;
