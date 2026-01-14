import { Link } from 'react-router-dom';
import { roles } from '../../../../../constants/roles';

export const UserPanel = ({ user, logout }) => (
	<>
		{user.role === roles.ADMIN ? (
			<Link to="/admin">Admin panel</Link>
		) : (
			<Link to="/reservations">My reservations</Link>
		)}
		<span>|</span>
		<button onClick={logout}>Exit</button>
	</>
);
