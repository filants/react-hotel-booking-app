import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	getAvailableRooms as getAvailableRoomsApi,
	createRoom as createRoomApi,
	updateRoom as updateRoomApi,
} from '../../api';
import { getErrorMessage } from '../../helpers';

export const fetchAvailableRooms = createAsyncThunk(
	'rooms/fetchAvailable',
	async ({ roomCategory = 'all', checkIn, checkOut, page = 1 } = {}, thunkAPI) => {
		try {
			const res = await getAvailableRoomsApi({
				roomCategory,
				checkIn,
				checkOut,
				page,
			});
			return {
				rooms: res.data.availableRooms,
				lastPage: res.data.lastPage,
				page,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(
				getErrorMessage(error, 'Failed to load rooms'),
			);
		}
	},
);

export const createRoom = createAsyncThunk('rooms/create', async (formData, thunkAPI) => {
	try {
		const res = await createRoomApi(formData);
		return res.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(getErrorMessage(error, 'Failed to create room'));
	}
});

export const updateRoom = createAsyncThunk(
	'rooms/update',
	async ({ id, formData }, thunkAPI) => {
		try {
			const res = await updateRoomApi(id, formData);
			return res.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				getErrorMessage(error, 'Failed to update room'),
			);
		}
	},
);

const roomsSlice = createSlice({
	name: 'rooms',
	initialState: {
		rooms: null,
		page: 1,
		lastPage: null,
		loading: false,
		error: null,
		query: null,
	},
	reducers: {
		setQuery: (state, action) => {
			state.query = action.payload;
		},
		resetRoomsState: (state) => {
			state.rooms = null;
			state.page = 1;
			state.lastPage = 1;
			state.loading = false;
			state.error = null;
			state.query = null;
		},
		setPage: (state, action) => {
			state.page = action.payload;
		},
		setRooms: (state, action) => {
			state.rooms = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// fetch
			.addCase(fetchAvailableRooms.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchAvailableRooms.fulfilled, (state, action) => {
				state.loading = false;
				state.rooms = action.payload.rooms;
				state.lastPage = action.payload.lastPage;
				state.page = action.payload.page;
			})
			.addCase(fetchAvailableRooms.rejected, (state, action) => {
				state.loading = false;
				state.rooms = [];
				state.error = action.payload || 'Failed to load rooms';
			})

			// create
			.addCase(createRoom.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createRoom.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(createRoom.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to create room';
			})

			// update
			.addCase(updateRoom.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateRoom.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(updateRoom.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to update room';
			});
	},
});

export const { resetRoomsState, setPage, setQuery, setRooms } = roomsSlice.actions;
export default roomsSlice.reducer;
