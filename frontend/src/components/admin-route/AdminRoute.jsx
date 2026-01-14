import { Navigate, Outlet } from 'react-router-dom';
import { Loader } from '..';
import { useAuth } from '../../contexts/AuthContext';
import { roles } from '../../constants/roles';

export const AdminRoute = () => {
	const { user, loadingUser } = useAuth();

	if (loadingUser) return <Loader />;

	if (!user) return <Navigate to="/login" replace />;

	if (user.role !== roles.ADMIN) return <Navigate to="/403" replace />;

	return <Outlet />;
};
