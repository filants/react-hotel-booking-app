import { Button } from '../../../';
import RoomCategoryIcon from './assets/room-category-icon.svg?react';
import AdultsIcon from './assets/adults-icon.svg?react';
import CalendarIcon from './assets/calendar-icon.svg?react';
import styled from 'styled-components';

const EditSearchContainer = ({
	className,
	searchReset,
	checkIn,
	checkOut,
	adults,
	roomCategory,
	roomCategories,
}) => {
	const formatted = (date) => {
		return date.split('-').reverse().join('/');
	};

	const roomCategoryLabel = (roomCategory, roomCategories) => {
		const result = roomCategories.find((category) => category.value === roomCategory);

		return result.label;
	};

	return (
		<div className={className}>
			<div className="dates">
				<CalendarIcon width={17} />
				{formatted(checkIn)} – {formatted(checkOut)}
			</div>
			<div className="adults">
				<AdultsIcon width={15} />
				{adults} Adults
			</div>
			<div className="room-category">
				<RoomCategoryIcon width={22} />
				{roomCategoryLabel(roomCategory, roomCategories)}
			</div>
			<Button className="secondary" clickEvent={searchReset}>
				Edit
			</Button>
		</div>
	);
};

export const EditSearch = styled(EditSearchContainer)`
	display: flex;
	align-items: baseline;
	gap: 20px;
	& div {
		white-space: nowrap;
		font: 600 16px / 20px 'Montserrat';
	}
	& button.secondary {
		padding-left: 25px;
		padding-right: 25px;
	}

	& .room-category,
	.adults,
	.dates {
		& svg {
			padding-right: 7px;
			margin-bottom: -2px;
		}
	}
`;
