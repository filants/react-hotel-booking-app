import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	getReservations as getReservationsApi,
	deleteReservation as deleteReservationApi,
} from '../../api';
import { getErrorMessage } from '../../helpers';

export const fetchReservations = createAsyncThunk(
	'reservations/fetch',
	async (page = 1, thunkApi) => {
		try {
			const res = await getReservationsApi(page);
			return {
				reservations: res.data.reservations,
				lastPage: res.data.lastPage,
				page,
			};
		} catch (error) {
			return thunkApi.rejectWithValue(
				getErrorMessage(error, 'Failed to load reservations'),
			);
		}
	},
);

export const deleteReservation = createAsyncThunk(
	'reservations/delete',
	async ({ reservationId, page }, thunkApi) => {
		try {
			await deleteReservationApi(reservationId);
			// refresh list after delete
			await thunkApi.dispatch(fetchReservations(page));
			return true;
		} catch (error) {
			return thunkApi.rejectWithValue(
				getErrorMessage(error, 'Failed to delete reservation'),
			);
		}
	},
);

const reservationsSlice = createSlice({
	name: 'reservations',
	initialState: {
		reservations: [],
		page: 1,
		lastPage: null,
		loading: false,
		deleteLoading: false,
		error: null,
	},
	reducers: {
		setReservationsPage: (state, action) => {
			state.page = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchReservations.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchReservations.fulfilled, (state, action) => {
				state.loading = false;
				state.reservations = action.payload.reservations;
				state.lastPage = action.payload.lastPage;
				state.page = action.payload.page;
			})
			.addCase(fetchReservations.rejected, (state, action) => {
				state.loading = false;
				state.reservations = [];
				state.error = action.payload || 'Failed to load reservations';
			})

			.addCase(deleteReservation.pending, (state) => {
				state.deleteLoading = true;
				state.error = null;
			})
			.addCase(deleteReservation.fulfilled, (state) => {
				state.deleteLoading = false;
			})
			.addCase(deleteReservation.rejected, (state, action) => {
				state.deleteLoading = false;
				state.error = action.payload || 'failed to delete reservation';
			});
	},
});

export const { setReservationsPage } = reservationsSlice.actions;
export default reservationsSlice.reducer;
