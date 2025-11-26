import { useAuth } from '../../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = ({ className }) => {
	const { user, logout, loadingUser } = useAuth();

	return (
		<nav className={className}>
			{loadingUser ? (
				<span>Loading...</span>
			) : user ? (
				<>
					<Link to="/reservations">My reservations</Link>
					<span>|</span>
					<button onClick={logout}>Exit</button>
				</>
			) : (
				<>
					<Link to="/login">Sign In</Link>
					<span>|</span>
					<Link to="/register">Sign Up</Link>
				</>
			)}
		</nav>
	);
};

export const Nav = styled(NavContainer)`
	position: absolute;
	right: 50px;
	bottom: 25px;
	& span {
		padding: 0 10px;
	}
	& button {
		font-weight: 500;
		color: #525759;
		border: none;
		background-color: #fff;
		cursor: pointer;
		padding: 0;
		transition: opacity 0.2s ease;
		&:hover {
			opacity: 0.5;
		}
	}
`;
