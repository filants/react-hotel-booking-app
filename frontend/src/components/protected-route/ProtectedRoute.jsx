import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = () => {
	const { user, loadingUser } = useSelector((s) => s.auth);

	if (loadingUser) return null;
	if (!user) return <Navigate to="/login" replace />;

	return <Outlet />;
};
