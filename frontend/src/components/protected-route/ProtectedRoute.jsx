import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const ProtectedRoute = () => {
	const { user, loadingUser } = useAuth();

	if (loadingUser) return null;
	if (!user) return <Navigate to="/login" replace />;

	return <Outlet />;
};
