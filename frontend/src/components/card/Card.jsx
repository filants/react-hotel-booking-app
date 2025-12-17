import { Link } from 'react-router-dom';
import { Button } from '..';
import styled from 'styled-components';

const CardContainer = ({ className, room }) => (
	<div className={className}>
		<img src={room.img} alt={room.name} />
		<div className="room-name">{room.name}</div>
		<Button className="primary">
			<Link to={room._id}>Open</Link>
		</Button>
	</div>
);

export const Card = styled(CardContainer)`
	height: 255px;
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 3px 3px 6px rgb(0, 0, 0, 0.2);
	position: relative;
	& img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		transition: transform 0.6s ease;
	}
	&::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 60%;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.55) 0%,
			rgba(0, 0, 0, 0) 100%
		);
		pointer-events: none;
	}
	& .room-name {
		position: absolute;
		color: #fff;
		bottom: 25px;
		left: 25px;
		font-size: 18px;
		font-weight: 500;
		z-index: 2;
	}
	& button {
		position: absolute;
		color: #fff;
		bottom: 20px;
		right: 25px;
		width: 95px;
		z-index: 2;
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	&:hover {
		& img {
			transform: scale(1.08);
		}
		& button {
			opacity: 1;
		}
	}
`;
