import { Link } from 'react-router-dom';
import { Button } from '..';
import { formattedDate } from '../../helpers';
import CalendarIcon from '../../assets/icons/calendar-icon.svg?react';
import styled from 'styled-components';

const CardContainer = ({
	className,
	room,
	variant,
	searchState,
	reservationState,
	handleDelete,
	deleting = false,
	available,
}) => (
	<div className={className}>
		<img src={room.pictures[0]} alt={room.name} />
		{variant === 'availability' && (
			<>
				<div className={`room-${available ? 'available' : 'not-available'}`}>
					{available ? 'Available' : 'Not available'}
				</div>
				<Link to={`/admin/add-room/${room._id}`}>
					<button title="Edit room" className="edit"></button>
				</Link>
			</>
		)}
		<div className="room-name">{room.name}</div>
		<Button className="primary">
			<Link
				to={`/rooms/${room._id}`}
				state={
					variant ? { ...searchState, ...reservationState, variant } : undefined
				}
			>
				Open
			</Link>
		</Button>
		{handleDelete && (
			<button
				title="Delete reservation"
				className="delete"
				onClick={() => handleDelete(reservationState._id)}
				disabled={deleting}
			></button>
		)}
		{reservationState && (
			<div className="reservation-details">
				<CalendarIcon className="calendar-icon" width="12" />
				{formattedDate(reservationState.checkIn)}
			</div>
		)}
	</div>
);

export const Card = styled(CardContainer)`
	position: relative;
	& img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		transition: transform 0.6s ease;
	}
	&::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 60%;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.55) 0%,
			rgba(0, 0, 0, 0) 100%
		);
		pointer-events: none;
	}
	& .room-name {
		position: absolute;
		color: #fff;
		bottom: 25px;
		left: 25px;
		font-size: 18px;
		font-weight: 500;
		z-index: 2;
		padding-right: 130px;
	}
	& button.primary {
		position: absolute;
		color: #fff;
		bottom: 20px;
		right: 25px;
		width: 95px;
		z-index: 2;
		opacity: 0;
		transition: all 0.3s ease;
		& a {
			display: block;
		}
	}
	&:hover {
		& img {
			transform: scale(1.08);
		}
		& button {
			opacity: 1;
		}
	}
	& button.delete {
		position: absolute;
		right: 25px;
		top: 20px;
		content: '';
		display: inline-block;
		width: 40px;
		height: 40px;
		background-image: url("data:image/svg+xml,%3Csvg width='39px' height='39px' viewBox='0 0 39 39' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3ETrash%3C/title%3E%3Cdefs%3E%3Cpolygon id='path-1' points='0 0 17 0 17 4 0 4'%3E%3C/polygon%3E%3C/defs%3E%3Cg id='Main' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='My-reservations' transform='translate(-410, -258)'%3E%3Cg id='Trash' transform='translate(410, 258)'%3E%3Ccircle id='Oval' fill='%23FFFFFF' cx='19.5' cy='19.5' r='19.5'%3E%3C/circle%3E%3Cg id='Group-6' transform='translate(11, 10)'%3E%3Cpath d='M8.54031048,11.973804 C8.54031048,10.5670183 8.54038284,9.16016054 8.54023813,7.75337476 C8.54023813,7.32283615 8.34068143,7.07113113 7.99952485,7.07069896 C7.65807884,7.07026789 7.45736445,7.32218873 7.45736445,7.75200797 C7.4572921,10.55371 7.4572921,13.3553402 7.45750916,16.1569703 C7.45750916,16.222792 7.45483201,16.2891892 7.46199521,16.3543635 C7.49238455,16.6311023 7.72413949,16.8392859 7.99815009,16.8396461 C8.27208833,16.8400053 8.50456683,16.6322533 8.53553502,16.3556583 C8.54284293,16.290556 8.54016577,16.2241588 8.54016577,16.1583371 C8.54038284,14.7634928 8.54031048,13.3686484 8.54031048,11.973804 M11.7913916,7.66165601 C11.8043433,7.34679093 11.6041354,7.09048199 11.2863496,7.07170662 C10.9891129,7.05408223 10.7305864,7.28456605 10.7108333,7.5954027 C10.6355835,8.77796311 10.5643132,9.96081128 10.4902211,11.1435156 C10.4240158,12.200763 10.3557845,13.2578665 10.2889279,14.315114 C10.2489153,14.9482251 10.2073108,15.5812643 10.1715671,16.2146632 C10.1554318,16.4998186 10.2781469,16.7067793 10.500785,16.7979226 C10.8638654,16.9466868 11.2267286,16.695773 11.2521254,16.2809885 C11.3272305,15.0563453 11.4029145,13.8317741 11.4796837,12.6072749 C11.5818498,10.9766234 11.6851736,9.34604387 11.7913916,7.66165601 M5.62322274,12.9974572 C5.62351216,12.9974572 5.62387394,12.9974572 5.62423572,12.9974572 C5.59645117,12.5492942 5.56881134,12.1011313 5.54088209,11.6529683 C5.45637076,10.2966098 5.372583,8.94017941 5.28604572,7.58389289 C5.27193638,7.36276078 5.16296887,7.19694767 4.9534271,7.11069608 C4.58926144,6.96085282 4.19781773,7.2269451 4.20953933,7.63108309 C4.22292511,8.09161912 4.26105651,8.55150772 4.28970932,9.01161213 C4.38203504,10.4934275 4.47486726,11.9752428 4.56762712,13.4570581 C4.62753754,14.4130912 4.6859285,15.3691962 4.74887786,16.3250135 C4.76783502,16.6126866 4.98316524,16.8231722 5.25811646,16.8389262 C5.5248915,16.8542487 5.7677892,16.6691566 5.81785926,16.4025608 C5.83305394,16.3214886 5.82856789,16.2353809 5.82335829,16.1521506 C5.75765942,15.1005142 5.69022401,14.0490217 5.62322274,12.9974572 M1.01265254,6 L15,6 C14.9617963,6.4703913 14.9250396,6.93322929 14.8865464,7.39599534 C14.7957402,8.48726863 14.7040657,9.57854191 14.6126806,10.6698152 C14.5088503,11.9101404 14.4050924,13.1504657 14.3011898,14.3908629 C14.2142907,15.4283998 14.1364361,16.4668718 14.0374537,17.5033297 C13.9535935,18.3810241 13.2780818,18.994137 12.391147,18.9958635 C9.46487014,19.0015464 6.53852088,19.0011148 3.61224398,18.9961512 C2.72444096,18.9946406 2.04270664,18.38347 1.96101719,17.5090126 C1.84242638,16.2399848 1.74445692,14.9690866 1.63780479,13.6989078 C1.5341916,12.4645533 1.43036133,11.2301988 1.32747169,9.99584424 C1.21763591,8.67789976 1.10881311,7.35995527 1.00006184,6.04201078 C0.999266759,6.03150809 1.00628525,6.0204299 1.01265254,6' id='Fill-1' fill='%23000000'%3E%3C/path%3E%3Cg id='Group-5'%3E%3Cmask id='mask-2' fill='white'%3E%3Cuse xlink:href='%23path-1'%3E%3C/use%3E%3C/mask%3E%3Cg id='Clip-4'%3E%3C/g%3E%3Cpath d='M11.33528,1.99205555 C11.33528,1.84709808 11.3358852,1.71493685 11.3352043,1.58270898 C11.3330862,1.19382308 11.1159793,1.00334563 10.6707967,1.00294574 C9.80819391,1.00214598 8.94559111,1.00267916 8.08298832,1.00267916 C7.47849311,1.00267916 6.87407355,1.00054645 6.26957833,1.00374551 C5.94883504,1.00541169 5.70593251,1.17922736 5.67809441,1.43988422 C5.65895572,1.61983142 5.67446335,1.80257781 5.67446335,1.99205555 L11.33528,1.99205555 Z M4.53453864,2.00025314 C4.53453864,1.83810072 4.5330257,1.69494272 4.53484123,1.55191801 C4.54611263,0.654381343 5.26922235,0.00863746584 6.28599373,0.00457199195 C7.76504396,-0.00142624822 9.24424549,-0.00175948378 10.7233714,0.00470528618 C11.7309138,0.00910399563 12.4544018,0.652448577 12.4695312,1.53952165 C12.4720275,1.68781148 12.4699094,1.8361013 12.4699094,2.00025314 C12.5556175,2.00025314 12.6230946,2.00025314 12.6905717,2.00025314 C13.7354081,2.00031979 14.7802446,1.99585443 15.825081,2.00178603 C16.6589379,2.00651797 17.1983767,2.65532762 16.9310402,3.3320624 C16.7785358,3.71801583 16.4514382,3.93022024 15.9955893,3.98866976 C15.9151009,3.99900006 15.8324187,3.99826694 15.75072,3.99826694 C10.9168008,3.99873347 6.08288153,3.99786706 1.2489623,4 C0.794475099,4.00019971 0.419417251,3.87143749 0.174699192,3.52273979 C-0.295598234,2.85240313 0.23559503,2.01871439 1.14653626,2.00278573 C1.76313499,1.99192225 2.3801876,2.00038644 2.99701328,2.00031979 C3.50006586,2.0001865 4.00311844,2.00025314 4.53453864,2.00025314 L4.53453864,2.00025314 Z' id='Fill-3' fill='%23000000' mask='url(%23mask-2)'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		background-repeat: no-repeat no-repeat;
		background-position: center center;
		background-size: cover;
		background-color: initial;
		border: initial;
		transition: opacity 0.3s ease;
		cursor: pointer;
		&:hover {
			opacity: 0.5;
		}
	}
	& button.edit {
		position: absolute;
		right: 25px;
		top: 20px;
		content: '';
		display: inline-block;
		width: 40px;
		height: 40px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 39 39'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: %23fff; %7D %3C/style%3E%3C/defs%3E%3C!-- Generator: Adobe Illustrator 28.7.3, SVG Export Plug-In . SVG Version: 1.2.0 Build 164) --%3E%3Cg%3E%3Cg id='Layer_1'%3E%3Cg id='Main'%3E%3Cg id='My-reservations'%3E%3Cg id='Trash'%3E%3Ccircle id='Oval' class='cls-1' cx='19.5' cy='19.5' r='19.5'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cpath d='M12.6,27s0,0,.1,0c.8-.1,1.7-.2,2.5-.3.6,0,1.2-.3,1.6-.8,2.3-2.3,4.7-4.7,7-7,.2-.2.2-.4,0-.6-1.2-1.2-2.3-2.3-3.5-3.5-.2-.2-.4-.2-.6,0-2.3,2.3-4.6,4.6-7,7-.4.4-.7.9-.8,1.5,0,.3,0,.6-.1.9,0,.6-.2,1.2-.2,1.8,0,.5.3.9.9.9ZM24,11.3c-.4,0-.8.1-1.1.5-.5.5-1.1,1.1-1.6,1.6-.2.2-.2.3,0,.5,1.2,1.2,2.4,2.4,3.6,3.6.2.2.3.2.5,0,.5-.5,1.1-1.1,1.6-1.6.6-.7.6-1.6,0-2.3-.6-.6-1.2-1.2-1.8-1.8-.3-.3-.7-.5-1.2-.5ZM23,27c1.2,0,2.5,0,3.7,0,.3,0,.6-.1.7-.4.2-.4-.2-.9-.7-.9-2.4,0-4.7,0-7.1,0-.1,0-.2,0-.4,0-.4,0-.6.3-.6.7,0,.4.3.6.7.6,1.2,0,2.5,0,3.7,0Z'/%3E%3Cpath d='M12.6,27c-.5,0-.9-.4-.9-.9,0-.6.1-1.2.2-1.8,0-.3,0-.6.1-.9,0-.6.3-1.1.8-1.5,2.3-2.3,4.6-4.6,7-7,.2-.2.4-.2.6,0,1.2,1.2,2.3,2.3,3.5,3.5.2.2.2.4,0,.6-2.3,2.3-4.7,4.7-7,7-.4.4-1,.7-1.6.8-.9,0-1.7.2-2.5.3,0,0-.1,0-.1,0Z'/%3E%3Cpath d='M24,11.3c.5,0,.9.2,1.2.5.6.6,1.2,1.2,1.8,1.8.6.7.6,1.6,0,2.3-.5.5-1.1,1.1-1.6,1.6-.2.2-.3.2-.5,0-1.2-1.2-2.4-2.4-3.6-3.6-.2-.2-.2-.3,0-.5.5-.5,1.1-1.1,1.6-1.6.3-.3.7-.4,1.1-.5Z'/%3E%3Cpath d='M23,27c-1.2,0-2.5,0-3.7,0-.4,0-.7-.3-.7-.6,0-.4.3-.7.6-.7.1,0,.2,0,.4,0,2.4,0,4.7,0,7.1,0,.5,0,.8.4.7.9-.1.3-.3.4-.7.4-1.2,0-2.5,0-3.7,0Z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		background-repeat: no-repeat no-repeat;
		background-position: center center;
		background-size: cover;
		background-color: initial;
		border: initial;
		transition: opacity 0.3s ease;
		cursor: pointer;
		&:hover {
			opacity: 0.5;
		}
	}
	& .reservation-details {
		position: absolute;
		z-index: 1;
		top: 25px;
		left: 25px;
		background-color: #fff;
		padding: 2px 10px;
		border-radius: 20px;
		font: 600 14px/24px 'Montserrat';
		& .calendar-icon {
			margin: 0 7px -0.5px 0;
		}
	}

	& .room-available,
	.room-not-available {
		position: absolute;
		left: 25px;
		top: 20px;
		font-style: italic;
		font-size: 0.8em;
		font-weight: 600;
		background-color: #ffffffbf;
		padding: 2px 10px;
		border-radius: 8px;
		&::before {
			content: '';
			display: inline-block;
			border-radius: 100%;
			margin-bottom: -1px;
			width: 12px;
			height: 12px;
			margin-right: 7px;
			background-color: red;
			box-shadow: 0 0 3px 0px red;
		}
	}

	& .room-available::before {
		background-color: #23cf23;
		box-shadow: 0 0 3px 0px #23cf23;
	}

	& .room-not-available::before {
		background-color: red;
		box-shadow: 0 0 3px 0px red;
	}
`;
