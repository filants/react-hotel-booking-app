import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
	Loader,
	Card,
	Title,
	SearchForm,
	EmptyPageMessage,
	FullPageContainer,
	Pagination,
} from '../../components';
import { useRooms } from '../../hooks/useRooms';
import { useRoomCategories } from '../../hooks/useRoomCategories';
import { getDate } from '../../helpers';
import styled from 'styled-components';

const HomeContainer = ({ className }) => {
	const location = useLocation();
	const { todayDate, tomorrowDate } = getDate();
	const { getAvailableRooms, rooms, page, lastPage, setPage, setRooms, loading } =
		useRooms();
	const { roomCategories } = useRoomCategories();
	const [checkIn, setCheckIn] = useState(todayDate);
	const [checkOut, setCheckOut] = useState(tomorrowDate);
	const [adults, setAdults] = useState(1);
	const [kids, setKids] = useState(0);
	const [roomCategory, setRoomCategory] = useState('all');

	const [hasSearched, setHasSearched] = useState(false);
	const preset = location.state;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setPage(1);
		setHasSearched(true);
	};

	useEffect(() => {
		if (!preset) return;

		setCheckIn(preset.checkIn);
		setCheckOut(preset.checkOut);
		setAdults(preset.adults);
		setRoomCategory(preset.roomCategory);
		setPage(1);
		setHasSearched(true);
	}, [preset, setPage]);

	useEffect(() => {
		if (!hasSearched) return;

		getAvailableRooms({ roomCategory, checkIn, checkOut, page });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasSearched, page]);

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
						clickEvent={() => {
							setRooms(null);
							setHasSearched(false);
							setPage(1);
						}}
						checkIn={checkIn}
						checkOut={checkOut}
						adults={adults}
						roomCategory={roomCategory}
						roomCategories={roomCategories}
					>
						Available rooms
					</Title>

					{loading && <Loader />}

					{!loading && !rooms.length && (
						<EmptyPageMessage>
							Nonthing available on chosen dates...
						</EmptyPageMessage>
					)}

					{!loading && rooms.length > 0 && (
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

					<Pagination page={page} lastPage={lastPage} setPage={setPage} />
				</FullPageContainer>
			)}
		</div>
	);
};

export const Home = styled(HomeContainer)``;
