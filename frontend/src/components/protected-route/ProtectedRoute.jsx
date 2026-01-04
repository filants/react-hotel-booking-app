import { Navigate } from 'react-router-dom';
import { Loader } from '..';
import { useAuth } from '../../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
	const { user, loadingUser } = useAuth();

	if (loadingUser) return <Loader />;

	return user ? children : <Navigate to="/login" replace />;
};
