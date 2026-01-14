import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLogin, apiRegister, apiLogout, apiMe } from '../api';
import { getErrorMessage } from '../helpers';
import { roles } from '../constants/roles';

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();

	const [user, setUser] = useState(null);
	const [apiError, setApiError] = useState('');
	const [loadingUser, setLoadingUser] = useState(true);
	const [authLoading, setAuthLoading] = useState(false);

	useEffect(() => {
		const loadUser = async () => {
			try {
				const res = await apiMe();
				setUser(res.data.user);
			} catch {
				setUser(null);
			} finally {
				setLoadingUser(false);
			}
		};

		loadUser();
	}, []);

	const clearApiError = () => setApiError('');

	const login = async (email, password) => {
		clearApiError();
		setAuthLoading(true);

		try {
			const res = await apiLogin(email, password);

			if (res.status === 200) {
				const user = res.data.user;
				setUser(user);

				const navigationURL =
					user.role === roles.ADMIN ? '/admin' : '/reservations';

				navigate(navigationURL);
			}
		} catch (error) {
			setApiError(getErrorMessage(error, 'Login failed'));
		} finally {
			setAuthLoading(false);
		}
	};

	const register = async (email, password) => {
		clearApiError();
		setAuthLoading(true);

		try {
			const res = await apiRegister(email, password);
			setUser(res.data.user);

			if (res.status === 201) {
				navigate('/');
			}
		} catch (error) {
			setApiError(getErrorMessage(error, 'Registration failed'));
		} finally {
			setAuthLoading(false);
		}
	};

	const logout = async () => {
		await apiLogout();
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				register,
				logout,
				loadingUser,
				authLoading,
				apiError,
				clearApiError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
