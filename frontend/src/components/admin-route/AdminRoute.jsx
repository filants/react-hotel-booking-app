import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { roles } from '../../constants/roles';

export const AdminRoute = () => {
	const { user, loadingUser } = useAuth();

	if (loadingUser) return null;

	if (!user) return <Navigate to="/login" replace />;

	if (user.role !== roles.ADMIN) return <Navigate to="/403" replace />;

	return <Outlet />;
};
