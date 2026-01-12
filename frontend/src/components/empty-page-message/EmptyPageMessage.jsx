import styled from 'styled-components';

const StyledDiv = styled.div`
	font: italic 600 22px / 18px 'Montserrat';
	font-style: italic;
	color: #a7a7a7;
	margin: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	& h1 {
		font-size: 3em;
		text-align: center;
		font-weight: 600;
	}
`;

export const EmptyPageMessage = ({ children }) => <StyledDiv>{children}</StyledDiv>;
