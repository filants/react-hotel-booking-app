import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = ({ className }) => (
	<nav className={className}>
		<Link to="/login">Sign In</Link>
		<span>|</span>
		<Link to="/register">Sign Up</Link>
	</nav>
);

export const Nav = styled(NavContainer)`
	position: absolute;
	right: 50px;
	bottom: 25px;
	& span {
		padding: 0 10px;
	}
`;
