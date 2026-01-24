import { useNavigate } from 'react-router-dom';
import { Button } from '../../../';
import { formattedDate } from '../../../../helpers';
import RoomCategoryIcon from './assets/room-category-icon.svg?react';
import AdultsIcon from './assets/adults-icon.svg?react';
import CalendarIcon from '../../../../assets/icons/calendar-icon.svg?react';
import styled from 'styled-components';

const EditSearchContainer = ({
	className,
	clickEvent,
	checkIn,
	checkOut,
	adults,
	roomCategoryLabel,
	variant,
	buttonName = 'Edit',
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<div className="dates">
				<CalendarIcon width={17} />
				{formattedDate(checkIn)} – {formattedDate(checkOut)}
			</div>
			<div className="adults">
				<AdultsIcon width={15} />
				{adults} Adults
			</div>

			{buttonName !== 'Back' && (
				<div className="room-category">
					<RoomCategoryIcon width={22} />
					{roomCategoryLabel}
				</div>
			)}

			<Button
				className="secondary"
				clickEvent={
					variant === 'reservation'
						? () => navigate('/reservations')
						: clickEvent
				}
			>
				{buttonName}
			</Button>
		</div>
	);
};

export const EditSearch = styled(EditSearchContainer)`
	display: flex;
	align-items: baseline;
	gap: 20px;
	@media (max-width: 768px) {
		position: relative;
		width: 100%;
		flex-direction: column;
	}
	& div {
		white-space: nowrap;
		font: 600 16px / 20px 'Montserrat';
	}
	& button.secondary {
		padding-left: 25px;
		padding-right: 25px;
		@media (max-width: 768px) {
			position: absolute;
			bottom: -7px;
			right: 0;
		}
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
