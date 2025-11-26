import styled from 'styled-components';

const TitleContainer = ({ className, children }) => {
	return (
		<div className={className}>
			<h1>{children}</h1>
		</div>
	);
};

export const Title = styled(TitleContainer)`
	border-bottom: 1px solid #d99a29;
	padding-bottom: 10px;
	margin-bottom: 30px;
	& h1 {
		font: 600 22px/26px 'Montserrat';
		letter-spacing: 0.35px;
	}
`;
