import { Title, Button, Input, SelectField } from '../../components';
import styled from 'styled-components';

const SearchFormContainer = ({
	className,
	handleSubmit,
	checkIn,
	setCheckIn,
	todayDate,
	checkOut,
	setCheckOut,
	adults,
	setAdults,
	kids,
	setKids,
	roomCategories,
	roomCategory,
	setRoomCategory,
}) => {
	return (
		<div className={className}>
			<video autoPlay loop muted playsInline>
				<source src="/video.mp4" type="video/mp4" />
				<source src="/video.webm" type="video/webm" />
				Your browser does not support the video tag.
			</video>
			<form onSubmit={handleSubmit} className="search-form" noValidate>
				<Title>Please enter the details of your upcoming stay with us</Title>
				<div className="search-inputs">
					<Input
						type="date"
						name="check-in"
						value={checkIn}
						onChange={({ target }) => setCheckIn(target.value)}
						min={todayDate}
						width="140px"
					>
						Check in
					</Input>
					<Input
						type="date"
						name="check-out"
						value={checkOut}
						onChange={({ target }) => setCheckOut(target.value)}
						min={checkIn}
						width="140px"
					>
						Check out
					</Input>
					<Input
						type="number"
						name="adults"
						value={adults}
						onChange={({ target }) => setAdults(target.value)}
						width="50px"
					>
						Adults
					</Input>
					<Input
						type="number"
						name="kids"
						value={kids}
						onChange={({ target }) => setKids(target.value)}
						width="50px"
					>
						Kids
					</Input>
					<SelectField
						options={roomCategories}
						roomCategory={roomCategory}
						setRoomCategory={setRoomCategory}
					/>
				</div>
				<Button className="primary">Search</Button>
			</form>
		</div>
	);
};

export const SearchForm = styled(SearchFormContainer)`
	height: calc(100vh - 100px);
	display: flex;
	align-items: center;
	position: relative;
	overflow: hidden;
	& video {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
		z-index: -1;
	}
	& .search-form {
		width: 635px;
		background-color: white;
		padding: 30px;
		border-radius: 12px;
		margin: -100px auto 0;
	}
	& .search-inputs {
		display: flex;
		gap: 20px;
		flex-wrap: nowrap;
		width: 100%;
		margin-top: -30px;
	}
	& button {
		margin-top: 30px;
	}
`;
