import { useState, useEffect } from 'react';
import { useRooms } from '../../hooks/useRooms';
import { useRoomCategories } from '../../hooks/useRoomCategories';
import { Title, Input, Button, SelectField, FormResponse } from '../../components';
import styled from 'styled-components';

const AddRoomContainer = ({ className }) => {
	const { createRoom, loading, error: apiError } = useRooms();
	const { roomCategories } = useRoomCategories();
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [size, setSize] = useState('');
	const [bed, setBed] = useState('');
	const [description, setDescription] = useState('');
	const [bathroom, setBathroom] = useState('');
	const [view, setView] = useState('');
	const [facilities, setFacilities] = useState('');
	const [pictures, setPictures] = useState([]);

	const [submitted, setSubmitted] = useState(false);
	const [formError, setFormError] = useState(null);

	const isEmpty = (value) => !String(value ?? '').trim();
	const isMissingPictures = (picturesArray) =>
		!picturesArray || picturesArray.length === 0;

	const missing = {
		name: isEmpty(name),
		category: isEmpty(category),
		size: isEmpty(size),
		bed: isEmpty(bed),
		description: isEmpty(description),
		bathroom: isEmpty(bathroom),
		view: isEmpty(view),
		facilities: isEmpty(facilities),
		pictures: isMissingPictures(pictures),
	};

	const hasMissing = Object.values(missing).some(Boolean);

	const handlePicturesChange = ({ target }) => {
		const filesArray = Array.from(target.files);
		setPictures(filesArray);
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

		await createRoom(
			name,
			category,
			size,
			bed,
			description,
			view,
			bathroomArray,
			facilitiesArray,
			pictures,
		);
	};

	useEffect(() => {
		if (formError) window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [formError]);

	return (
		<div className={className}>
			<form onSubmit={handleSubmit} noValidate>
				<Title>Add hotel room</Title>
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
					multiple
					isRequired
					error={submitted && missing.pictures ? 'Select a file' : null}
				>
					Pictures
				</Input>
				<Button
					type="submit"
					className="primary"
					clickEvent={handleSubmit}
					disabled={loading}
				>
					{loading ? 'Loading...' : 'Create'}
				</Button>
			</form>
		</div>
	);
};

export const AddRoom = styled(AddRoomContainer)`
	width: 375px;
	margin: 20px auto 15rem;
	& button[type='submit'] {
		margin-top: 35px;
	}
	& .room-description {
		display: flex;
		flex-direction: column;
		& label {
			font-style: italic;
			font-weight: 450;
			color: rgba(82, 87, 89, 1);
			margin-bottom: 5px;
		}
		& textarea {
			font: 300 15px/24px 'Montserrat';
			border-radius: 4px;
			border: 1px solid #d0d0d0;
			padding: 3px 5px;
			transition: border-color 0.2s ease;
			&:hover {
				border: 1px solid #d99a29;
			}
			&:focus-visible {
				outline: none;
				border: 1px solid #d99a29;
			}
			&::placeholder {
				color: #d0d0d0;
			}
		}
	}
`;
