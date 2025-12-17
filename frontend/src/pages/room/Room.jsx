import { Title } from '../../components';
import styled from 'styled-components';

const RoomContainer = ({ className }) => {
	return (
		<div className={className}>
			<Title>Room details</Title>
		</div>
	);
};

export const Room = styled(RoomContainer)``;
