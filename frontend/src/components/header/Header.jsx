import { Link } from 'react-router-dom';
import { Nav } from './components';
import Logo from './assets/courtyard-by-marriott-logo.svg?react';
import styled from 'styled-components';

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Link to="/">
			<Logo width={250} alt="Courtyard by Marriott Logo" />
		</Link>
		<Nav />
	</header>
);

export const Header = styled(HeaderContainer)`
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
	position: sticky;
	top: 0;
	width: 100%;
	background-color: #fff;
	z-index: 10;
	@media (max-width: 769px) {
		height: 70px;
		justify-content: space-between;
		& svg {
			width: 150px;
			margin-left: 20px;
		}
		& nav {
			margin-right: 20px;
		}
	}
	& svg {
		margin-top: 10px;
		transition: opacity 0.2s ease;
		&:hover {
			opacity: 0.7;
		}
	}
`;
