import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../store/slices/authSlice';
import { UserPanel } from './components/UserPanel';
import styled from 'styled-components';

const NavContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { user, loadingUser } = useSelector((s) => s.auth);

	const handleLogout = () => dispatch(logout());

	return (
		<nav className={className}>
			{loadingUser ? (
				<span>Loading...</span>
			) : user ? (
				<UserPanel user={user} logout={handleLogout} />
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
	@media (min-width: 769px) {
		position: absolute;
		right: 50px;
		bottom: 25px;
	}
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
