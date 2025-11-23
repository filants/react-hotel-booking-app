import styled from 'styled-components';

const HomeContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="heading-title">
				<h1>Available rooms</h1>
			</div>
		</div>
	);
};

export const Home = styled(HomeContainer)`
	.heading-title {
		border-bottom: 1px solid #d99a29;
		padding-bottom: 10px;
		& h1 {
			font: 600 22px/26px 'Montserrat';
			letter-spacing: 0.35px;
		}
	}
`;
