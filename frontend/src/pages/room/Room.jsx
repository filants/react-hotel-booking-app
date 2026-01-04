import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
import { Title, Loader, EmptyPageMessage, BookButton } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';

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
			<div className="room-details">
				<div className="image">
					<img alt={`${room.name} photo`} src={room.img} />
				</div>
				<div className="information">
					<div className="room-name">
						<h2>{room.name}</h2>
					</div>
					<div className="room-size">
						<h3>Room size: {room.size}&#8239;m&sup2;</h3>
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
					{variant === 'search' && (
						<BookButton
							user={user}
							handleBook={handleBook}
							loading={loading}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export const Room = styled(RoomContainer)`
	padding: 40px;
	@media (max-width: 768px) {
		padding: 20px;
	}
	& .room-details {
		display: flex;
		justify-content: center;
		gap: 40px 90px;
		@media (max-width: 1025px) {
			flex-direction: column;
			align-items: center;
		}
		& .image {
			max-width: 660px;
			& img {
				width: 100%;
				border-radius: 12px;
				aspect-ratio: 660 / 382;
				object-fit: cover;
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
`;
