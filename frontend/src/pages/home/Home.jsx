import { Title } from '../../components';
import styled from 'styled-components';

const HomeContainer = ({ className }) => {
	return (
		<div className={className}>
			<Title>Available rooms</Title>
		</div>
	);
};

export const Home = styled(HomeContainer)``;
