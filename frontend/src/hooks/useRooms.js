import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms, createRoom as createRoomApi } from '../api';
import { getErrorMessage } from '../helpers';

export const useRooms = () => {
	const navigate = useNavigate();
	const [rooms, setRooms] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const getAvailableRooms = async (roomCategory, checkIn, checkOut) => {
		setLoading(true);

		try {
			const res = await getRooms(roomCategory, checkIn, checkOut);

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

	return { getAvailableRooms, createRoom, rooms, setRooms, loading, error };
};
