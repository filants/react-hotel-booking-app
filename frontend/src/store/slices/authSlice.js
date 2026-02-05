import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiLogin, apiRegister, apiLogout, apiMe } from '../../api';
import { getErrorMessage } from '../../helpers';

// Load user from cookie on app start
export const fetchMe = createAsyncThunk('auth/me', async () => {
	try {
		const res = await apiMe();
		return res.data.user;
	} catch {
		return null; // not authenticated
	}
});

export const login = createAsyncThunk(
	'auth/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const res = await apiLogin(email, password);
			return res.data.user;
		} catch (error) {
			return thunkAPI.rejectWithValue(getErrorMessage(error, 'Login failed'));
		}
	},
);

export const register = createAsyncThunk(
	'auth/register',
	async ({ email, password }, thunkAPI) => {
		try {
			const res = await apiRegister(email, password);
			return res.data.user;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				getErrorMessage(error, 'Registration failed'),
			);
		}
	},
);

export const logout = createAsyncThunk('auth/logout', async () => {
	await apiLogout();
	return true;
});

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		loadingUser: true,
		authLoading: false,
		apiError: '',
	},
	reducers: {
		clearApiError: (state) => {
			state.apiError = '';
		},
	},
	extraReducers: (builder) => {
		builder
			// fetchMe
			.addCase(fetchMe.pending, (state) => {
				state.loadingUser = true;
			})
			.addCase(fetchMe.fulfilled, (state, action) => {
				state.user = action.payload; // user or null
				state.loadingUser = false;
			})
			.addCase(fetchMe.rejected, (state) => {
				state.user = null;
				state.loadingUser = false;
			})

			// login
			.addCase(login.pending, (state) => {
				state.authLoading = true;
				state.apiError = '';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.authLoading = false;
			})
			.addCase(login.rejected, (state, action) => {
				state.authLoading = false;
				state.apiError = action.payload || 'Login failed';
			})

			// register
			.addCase(register.pending, (state) => {
				state.authLoading = true;
				state.apiError = '';
			})
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload;
				state.authLoading = false;
			})
			.addCase(register.rejected, (state, action) => {
				state.authLoading = false;
				state.apiError = action.payload || 'Registration failed';
			})

			// logout
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			});
	},
});

export const { clearApiError } = authSlice.actions;
export default authSlice.reducer;
