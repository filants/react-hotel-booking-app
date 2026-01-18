import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	getAvailableRooms as getAvailableRoomsApi,
	createRoom as createRoomApi,
	updateRoom as updateRoomApi,
} from '../api';
import { getErrorMessage } from '../helpers';

export const useRooms = () => {
	const navigate = useNavigate();
	const [rooms, setRooms] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const getAvailableRooms = async (roomCategory, checkIn, checkOut) => {
		setLoading(true);

		try {
			const res = await getAvailableRoomsApi(roomCategory, checkIn, checkOut);

			setRooms(res.data);
		} catch {
			setRooms([]);
		} finally {
			setLoading(false);
		}
	};

	const createRoom = async (
		name,
		category,
		size,
		bed,
		description,
		view,
		bathroomArray,
		facilitiesArray,
		pictures,
	) => {
		setLoading(true);
		setError(null);

		try {
			const formData = new FormData();
			formData.append('name', name);
			formData.append('category', category);
			formData.append('size', size);
			formData.append('bed', bed);
			formData.append('description', description);
			formData.append('view', view);

			formData.append('bathroom', JSON.stringify(bathroomArray));
			formData.append('facilities', JSON.stringify(facilitiesArray));

			pictures.forEach((file) => formData.append('pictures', file));

			const res = await createRoomApi(formData);
			if (res.status === 201) navigate(`/rooms/${res.data._id}`);
		} catch (error) {
			setError(getErrorMessage(error));
		} finally {
			setLoading(false);
		}
	};

	const updateRoom = async (id, data, newPictures) => {
		setLoading(true);
		setError(null);

		try {
			const fd = new FormData();
			fd.append('name', data.name);
			fd.append('category', data.category);
			fd.append('size', data.size);
			fd.append('bed', data.bed);
			fd.append('description', data.description);
			fd.append('view', data.view);

			fd.append('bathroom', JSON.stringify(data.bathroomArray));
			fd.append('facilities', JSON.stringify(data.facilitiesArray));

			fd.append('keepPictures', JSON.stringify(data.keepPictures));

			newPictures.forEach((file) => fd.append('pictures', file));

			const res = await updateRoomApi(id, fd);

			if (res.status === 200) navigate(`/rooms/${id}`);
		} catch (error) {
			setError(getErrorMessage(error));
		} finally {
			setLoading(false);
		}
	};

	return { getAvailableRooms, createRoom, updateRoom, rooms, setRooms, loading, error };
};
