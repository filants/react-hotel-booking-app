import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
import {
	Title,
	Loader,
	EmptyPageMessage,
	BookButton,
	FullPageContainer,
} from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styled from 'styled-components';
import { roles } from '../../constants/roles';

const RoomContainer = ({ className }) => {
	const params = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const { addBooking, room, loading, error } = useRoom(params.id);
	const { state } = useLocation();
	const { checkIn, checkOut, adults, roomCategory, roomCategories, variant } =
		state || {};

	const handleBook = async () => {
		await addBooking(user.id, adults, checkIn, checkOut);
	};

	if (loading && !room) return <Loader />;
	if (error) return <EmptyPageMessage>{error}...</EmptyPageMessage>;

	return (
		<div className={className}>
			<FullPageContainer>
				{variant === 'search' || variant === 'reservation' ? (
					<Title
						edit={true}
						buttonName="Back"
						clickEvent={() =>
							navigate('/', {
								state: { checkIn, checkOut, adults, roomCategory },
							})
						}
						checkIn={checkIn}
						checkOut={checkOut}
						adults={adults}
						roomCategory={roomCategory}
						roomCategories={roomCategories}
						variant={variant}
					>
						{variant === 'reservation' ? 'Reservation' : 'Room'} details
					</Title>
				) : (
					<Title variant={variant}>Room details</Title>
				)}

				<div className="room-details">
					<div className="image">
						<Swiper
							pagination={{ type: 'fraction' }}
							navigation={true}
							modules={[Pagination, Navigation]}
							className="swiper"
							loop={true}
						>
							{room.pictures.map((picture) => (
								<SwiperSlide key={picture}>
									<img alt={`${room.name} photo`} src={picture} />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className="information">
						<div className="room-name">
							<h2>{room.name}</h2>
						</div>
						<div className="room-size">
							<h3>Room size: {room.size}&#8239;m&sup2;</h3>
						</div>
						<div className="room-bed">
							<svg viewBox="0 0 128 128" width="25" height="25">
								<path d="M120 88v8a4 4 0 0 1-8 0v-8H16v8a4 4 0 0 1-8 0v-8a8 8 0 0 1 8-8h96a8 8 0 0 1 8 8zM20 52a4 4 0 0 1 4-4h80a4 4 0 0 1 4 4v8h8v-8a12 12 0 0 0-12-12H24a12 12 0 0 0-12 12v8h8zm40 20a8 8 0 0 0-8-8H20a8 8 0 0 0-8 8v4h48zm16-8a8 8 0 0 0-8 8v4h48v-4a8 8 0 0 0-8-8z"></path>
							</svg>
							<h3>{room.bed}</h3>
						</div>
						<div className="room-description">{room.description}</div>
						<div className="room-bathroom">
							<h3>In the bathroom:</h3>
							<div className="room-bathroom-list">
								{room.bathroom.map((item, index) => (
									<div className="bathroom-item" key={index}>
										&#10003; {item}
									</div>
								))}
							</div>
						</div>
						<div className="room-view">
							<h3>View:</h3>
							{room.view}
						</div>
						<div className="room-facilities">
							<h3>Facilities:</h3>
							<div className="room-facilities-list">
								{room.facilities.map((item, index) => (
									<div key={index}>&#10003; {item}</div>
								))}
							</div>
						</div>
						{variant === 'search' && user?.role !== roles.ADMIN && (
							<BookButton
								user={user}
								handleBook={handleBook}
								loading={loading}
							/>
						)}
					</div>
				</div>
			</FullPageContainer>
		</div>
	);
};

export const Room = styled(RoomContainer)`
	& .room-details {
		display: flex;
		justify-content: center;
		gap: 40px 90px;
		margin-bottom: 5rem;
		@media (max-width: 1025px) {
			flex-direction: column;
			align-items: center;
			margin-bottom: 2rem;
		}
		& .image {
			width: 100%;
			max-width: 660px;
			& img {
				height: 100%;
				width: 100%;
				object-fit: cover;
				object-position: center;
			}
			& .swiper {
				--swiper-navigation-color: #fff;
				--swiper-navigation-size: 30px;
				--swiper-navigation-sides-offset: 15px;
				aspect-ratio: 660 / 382;
				border-radius: 12px;
			}
			& .swiper-pagination {
				color: #fff;
				margin-bottom: 5px;
				& .swiper-pagination-total {
					opacity: 0.5;
				}
			}
		}
		& .information {
			max-width: 660px;
			display: flex;
			flex-direction: column;
			gap: 15px 0;
		}
	}
	& h2 {
		font: 550 18px/22px 'Montserrat';
		letter-spacing: 0.3px;
		margin: 0;
	}
	& h3 {
		font-weight: 550;
	}
	& .room-bathroom-list,
	.room-facilities-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 20px;
		row-gap: 3px;
		& div {
			break-inside: avoid;
		}
	}

	& .room-bed {
		display: flex;
		align-items: center;
		& svg {
			margin: -3px 7px 0 0;
		}
		& h3 {
			margin: 0;
		}
	}
`;
