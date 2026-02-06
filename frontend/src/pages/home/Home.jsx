import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchAvailableRooms,
	setPage as setRoomsPage,
	setRooms as setRoomsArray,
	setQuery as setSearchQuery,
} from '../../store/slices/roomsSlice';
import {
	Loader,
	Card,
	Title,
	SearchForm,
	EmptyPageMessage,
	FullPageContainer,
	Pagination,
} from '../../components';
import { useRoomCategories } from '../../hooks/useRoomCategories';
import { getDate } from '../../helpers';
import styled from 'styled-components';

const HomeContainer = ({ className }) => {
	const location = useLocation();
	const preset = location.state;
	const dispatch = useDispatch();

	const { todayDate, tomorrowDate } = getDate();

	const { lastPage, loading, query, rooms, page } = useSelector((s) => s.rooms);
	const setPage = (newPage) => dispatch(setRoomsPage(newPage));
	const setRooms = (rooms) => dispatch(setRoomsArray(rooms));
	const setQuery = (query) => dispatch(setSearchQuery(query));

	const { roomCategories } = useRoomCategories();

	const [checkIn, setCheckIn] = useState(todayDate);
	const [checkOut, setCheckOut] = useState(tomorrowDate);
	const [adults, setAdults] = useState(1);
	const [kids, setKids] = useState(0);
	const [roomCategory, setRoomCategory] = useState('all');

	useEffect(() => {
		if (!query) return;

		setRoomCategory(query.roomCategory);
		setCheckIn(query.checkIn);
		setCheckOut(query.checkOut);
	}, [query]);

	useEffect(() => {
		if (!preset) return;

		setRooms([]);
		setPage(1);
		setQuery({
			roomCategory: preset.roomCategory,
			checkIn: preset.checkIn,
			checkOut: preset.checkOut,
			adults: preset.adults,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, preset]);

	useEffect(() => {
		if (!query) return;
		dispatch(fetchAvailableRooms({ ...query, page }));
	}, [dispatch, query, page]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setQuery({ roomCategory, checkIn, checkOut, adults });
		setPage(1);
		setRooms([]);
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
							setQuery(null);
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
