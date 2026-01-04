import styled from 'styled-components';

const StyledButton = styled.button`
	&.primary {
		background-color: #d99a29;
		border: 1px solid #d99a29;
		color: #fff;
		&:hover {
			background-color: rgba(82, 87, 89, 1);
			border: 1px solid rgba(82, 87, 89, 1);
		}
	}
	&.secondary {
		border: 1px solid rgba(82, 87, 89, 1);
		color: rgba(82, 87, 89, 1);
		background-color: #fff;
		&:hover {
			opacity: 0.5;
		}
	}
	width: 100%;
	margin-top: 15px;
	border-radius: 6px;
	font-weight: 400;
	padding: 4px 0;
	cursor: pointer;
	transition:
		all 0.2s ease,
		opacity 0.2s ease;
`;

export const Button = ({ children, clickEvent, ...props }) => (
	<StyledButton onClick={clickEvent} {...props}>
		{children}
	</StyledButton>
);
