import { useAuth } from '../../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserPanel } from './components/UserPanel';

const NavContainer = ({ className }) => {
	const { user, logout, loadingUser } = useAuth();

	return (
		<nav className={className}>
			{loadingUser ? (
				<span>Loading...</span>
			) : user ? (
				<UserPanel user={user} logout={logout} />
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
		border: none;
		background-color: #fff;
		cursor: pointer;
		padding: 0;
	}
	& a,
	button {
		color: #525759;
		font-weight: 500;
		transition: opacity 0.2s ease;
		&:hover {
			opacity: 0.7;
		}
	}
`;
