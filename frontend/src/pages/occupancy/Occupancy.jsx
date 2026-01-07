import { Title } from '../../components';
import styled from 'styled-components';

const OccupancyContainer = ({ className }) => {
	return (
		<div className={className}>
			<Title>Hotel occupancy</Title>
		</div>
	);
};
export const Occupancy = styled(OccupancyContainer)`
	padding: 40px;
`;
