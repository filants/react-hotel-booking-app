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
	const preset = location.state;

	const { todayDate, tomorrowDate } = getDate();
	const { getAvailableRooms, rooms, page, lastPage, setPage, setRooms, loading } =
		useRooms();
	const { roomCategories } = useRoomCategories();

	const [checkIn, setCheckIn] = useState(todayDate);
	const [checkOut, setCheckOut] = useState(tomorrowDate);
	const [adults, setAdults] = useState(1);
	const [kids, setKids] = useState(0);
	const [roomCategory, setRoomCategory] = useState('all');

	useEffect(() => {
		if (!preset) return;

		setRooms([]);
		setCheckIn(preset.checkIn);
		setCheckOut(preset.checkOut);
		setAdults(preset.adults);
		setRoomCategory(preset.roomCategory);
		setPage(1);
		getAvailableRooms({
			roomCategory: preset.roomCategory,
			checkIn: preset.checkIn,
			checkOut: preset.checkOut,
			page: 1,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [preset, setRooms, setPage]);

	useEffect(() => {
		if (rooms === null) return;

		getAvailableRooms({ roomCategory, checkIn, checkOut, page });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setRooms([]);
		setPage(1);
		await getAvailableRooms({ roomCategory, checkIn, checkOut, page: 1 });
	};

	const roomsList = rooms ?? [];

	const selected = roomCategories?.find((o) => o.value === roomCategory);
	const roomCategoryLabel = selected?.label || roomCategory;

	return (
		<div className={className}>
			{rooms === null ? (
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
							setRooms(null); // back to search screen
							setPage(1);
						}}
						checkIn={checkIn}
						checkOut={checkOut}
						adults={adults}
						roomCategory={roomCategory}
						roomCategoryLabel={roomCategoryLabel}
					>
						Available rooms
					</Title>

					{loading && <Loader />}

					{!loading && roomsList.length === 0 && (
						<EmptyPageMessage>
							Nonthing available on chosen dates...
						</EmptyPageMessage>
					)}

					{!loading && roomsList.length > 0 && (
						<div className="cards-container">
							{roomsList.map((room) => (
								<Card
									key={room._id}
									room={room}
									variant="search"
									searchState={{
										checkIn,
										checkOut,
										adults,
										roomCategory,
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
