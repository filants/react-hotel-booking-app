import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
import { useRooms } from '../../hooks/useRooms';
import { useRoomCategories } from '../../hooks/useRoomCategories';
import {
	Title,
	Input,
	Button,
	SelectField,
	FormResponse,
	FullPageContainer,
} from '../../components';
import styled from 'styled-components';

const AddRoomContainer = ({ className }) => {
	const params = useParams();
	const { room } = useRoom(params.id);
	const { createRoom, updateRoom, loading, error: apiError } = useRooms();
	const { roomCategories } = useRoomCategories();
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [size, setSize] = useState('');
	const [bed, setBed] = useState('');
	const [description, setDescription] = useState('');
	const [bathroom, setBathroom] = useState('');
	const [view, setView] = useState('');
	const [facilities, setFacilities] = useState('');
	const [existingPictures, setExistingPictures] = useState([]);
	const [newPictures, setNewPictures] = useState([]);

	const [submitted, setSubmitted] = useState(false);
	const [formError, setFormError] = useState(null);

	useEffect(() => {
		if (!room) return;

		setName(room.name);
		setCategory(room.category);
		setSize(room.size);
		setBed(room.bed);
		setDescription(room.description);
		setBathroom(room.bathroom.join('\n'));
		setView(room.view);
		setFacilities(room.facilities.join('\n'));
		setExistingPictures(room.pictures);
		setNewPictures([]);
	}, [room]);

	const isEmpty = (value) => !String(value ?? '').trim();

	const picturesMissing = params.id
		? existingPictures.length === 0 && newPictures.length === 0
		: newPictures.length === 0;

	const missing = {
		name: isEmpty(name),
		category: isEmpty(category),
		size: isEmpty(size),
		bed: isEmpty(bed),
		description: isEmpty(description),
		bathroom: isEmpty(bathroom),
		view: isEmpty(view),
		facilities: isEmpty(facilities),
		pictures: picturesMissing,
	};

	const hasMissing = Object.values(missing).some(Boolean);

	const fileLabel = (url) => url.split('/').pop();

	const handlePicturesChange = ({ target }) => {
		const file = target.files?.[0];
		if (!file) return;

		setNewPictures((prev) => {
			const exists = prev.some((p) => p.name === file.name);
			if (exists) return prev;
			return [...prev, file];
		});

		target.value = '';
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		setFormError(null);

		if (hasMissing) {
			setFormError('Please fill in all requires fields');
			return;
		}

		const bathroomArray = bathroom
			.split(/[,.\n]+/)
			.map((item) => item.trim())
			.filter(Boolean);

		const facilitiesArray = facilities
			.split(/[,.\n]+/)
			.map((item) => item.trim())
			.filter(Boolean);

		if (params.id) {
			await updateRoom(
				params.id,
				{
					name,
					category,
					size,
					bed,
					description,
					view,
					bathroomArray,
					facilitiesArray,
					keepPictures: existingPictures,
				},
				newPictures,
			);
		} else {
			await createRoom(
				name,
				category,
				size,
				bed,
				description,
				view,
				bathroomArray,
				facilitiesArray,
				newPictures,
			);
		}
	};

	useEffect(() => {
		if (formError) window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [formError]);

	return (
		<div className={className}>
			<FullPageContainer>
				<Title>{params.id ? 'Edit' : 'Add'} hotel room</Title>
				<form onSubmit={handleSubmit} noValidate>
					{formError && <FormResponse type="error">{formError}</FormResponse>}
					{apiError && <FormResponse type="error">{apiError}</FormResponse>}
					<Input
						type="text"
						name="name"
						value={name}
						onChange={({ target }) => setName(target.value)}
						isRequired
						error={submitted && missing.name ? true : null}
					>
						Name
					</Input>
					<SelectField
						options={roomCategories}
						roomCategory={category}
						setRoomCategory={setCategory}
						isRequired
						error={submitted && missing.category ? true : null}
					/>
					<Input
						type="text"
						name="size"
						value={size}
						onChange={({ target }) => setSize(target.value)}
						isRequired
						error={submitted && missing.size ? true : null}
					>
						Size
					</Input>
					<Input
						type="text"
						name="bed"
						value={bed}
						onChange={({ target }) => setBed(target.value)}
						isRequired
						error={submitted && missing.bed ? true : null}
					>
						Bed
					</Input>
					<Input
						name="description"
						value={description}
						onChange={({ target }) => setDescription(target.value)}
						istextarea={true}
						isRequired
						error={submitted && missing.description ? true : null}
					>
						Description
					</Input>
					<Input
						name="bathroom"
						value={bathroom}
						onChange={({ target }) => setBathroom(target.value)}
						istextarea={true}
						placeholder="Free toiletries, Shower, Bathrobe..."
						isRequired
						error={submitted && missing.bathroom ? true : null}
					>
						In the bathroom
					</Input>
					<Input
						type="text"
						name="view"
						value={view}
						onChange={({ target }) => setView(target.value)}
						isRequired
						error={submitted && missing.view ? true : null}
					>
						View
					</Input>
					<Input
						name="facilities"
						value={facilities}
						onChange={({ target }) => setFacilities(target.value)}
						istextarea={true}
						placeholder="Balcony, Air conditioning, Safe..."
						isRequired
						error={submitted && missing.facilities ? true : null}
					>
						Facilities
					</Input>
					<Input
						type="file"
						name="pictures"
						onChange={handlePicturesChange}
						accept="image/jpeg, image/jpg"
						isRequired
						error={submitted && missing.pictures ? 'Select a file' : null}
					>
						Pictures
					</Input>

					{existingPictures.length > 0 && (
						<div className="pictures-list">
							<strong>Existing pictures</strong>
							{existingPictures.map((url, idx) => (
								<div key={`${url}-${idx}`}>
									<span>{fileLabel(url)}</span>
									<button
										type="button"
										onClick={() =>
											setExistingPictures((prev) =>
												prev.filter((_, i) => i !== idx),
											)
										}
									>
										&#10005;
									</button>
								</div>
							))}
						</div>
					)}

					{newPictures.length > 0 && (
						<div className="pictures-list">
							<strong>{params.id && 'New pictures'}</strong>
							{newPictures.map((file, idx) => (
								<div key={`${file.name}-${idx}`}>
									<span>{file.name}</span>
									<button
										type="button"
										onClick={() =>
											setNewPictures((prev) =>
												prev.filter((_, i) => i !== idx),
											)
										}
									>
										&#10005;
									</button>
								</div>
							))}
						</div>
					)}
					<Button
						type="submit"
						className="primary"
						clickEvent={handleSubmit}
						disabled={loading}
					>
						{loading ? 'Loading...' : 'Save'}
					</Button>
				</form>
			</FullPageContainer>
		</div>
	);
};

export const AddRoom = styled(AddRoomContainer)`
	width: 450px;
	margin: 20px auto 15rem;
	& button[type='submit'] {
		margin-top: 35px;
	}
	& .pictures-list {
		margin-top: 20px;
		& strong {
			font-style: italic;
			font-weight: 450;
			color: rgba(82, 87, 89, 1);
			display: inline-block;
			margin-bottom: 10px;
		}
		& > div {
			display: flex;
			gap: 10px 0;
			margin-bottom: 5px;
			justify-content: space-between;
		}
		& button[type='button'] {
			padding: 0;
			background-color: initial;
			border: none;
			cursor: pointer;
			transition: opacity 0.2s ease;
			&:hover {
				opacity: 0.5;
			}
		}
	}
`;
