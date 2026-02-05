import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { roles } from '../../constants/roles';

export const AdminRoute = () => {
	const { user, loadingUser } = useSelector((s) => s.auth);

	if (loadingUser) return null;

	if (!user) return <Navigate to="/login" replace />;

	if (user.role !== roles.ADMIN) return <Navigate to="/403" replace />;

	return <Outlet />;
};
