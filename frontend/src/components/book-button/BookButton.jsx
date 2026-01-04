import { Link } from 'react-router-dom';
import { Button } from '..';
import styled from 'styled-components';

const BookButtonContainer = ({ className, user, handleBook, loading }) => (
	<div className={className}>
		{user ? (
			<Button className="primary" onClick={handleBook} disabled={loading}>
				Book
			</Button>
		) : (
			<div className="alert-message">
				<Link to="/login">Sign in</Link> to book
			</div>
		)}
	</div>
);

export const BookButton = styled(BookButtonContainer)`
	& .primary {
		margin-top: 2rem;
		width: 100px;
	}
	& .alert-message {
		width: max-content;
		padding: 10px 17px;
		background-color: #ececec;
		border-radius: 6px;
		margin-top: 2rem;
		font-size: 13px;
		& a {
			font-size: 13px;
			text-decoration: underline;
			transition: opacity 0.2s ease;
			&:hover {
				opacity: 0.5;
			}
		}
		&::before {
			content: '';
			display: inline-block;
			width: 13px;
			height: 13px;
			margin: 0 6px -2px 0;
			background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 20 20'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: none; %7D .cls-2 %7B fill: %23565656; %7D %3C/style%3E%3C/defs%3E%3C!-- Generator: Adobe Illustrator 28.7.3, SVG Export Plug-In . SVG Version: 1.2.0 Build 164) --%3E%3Cg%3E%3Cg id='Layer_1'%3E%3Cg%3E%3Cpath class='cls-1' d='M10,3c-.9,0-1.5.7-1.4,1.6,0,.5,0,1,.1,1.5.2,2,.3,4.1.5,6.1,0,.1,0,.2,0,.3.2.4.6.5,1,.5.4,0,.7-.4.7-.9,0-1.3.2-2.6.3-3.9,0-1.2.2-2.4.3-3.6,0-.9-.6-1.6-1.5-1.6Z'/%3E%3Cpath class='cls-2' d='M10,0C4.5,0,0,4.5,0,10c0,5.5,4.5,10,10,10,5.6,0,10-4.5,10-10.1C20,4.5,15.5,0,10,0ZM10,17c-.7,0-1.3-.6-1.3-1.3,0-.7.6-1.3,1.3-1.3.7,0,1.2.6,1.2,1.2,0,.7-.6,1.3-1.2,1.3ZM11.2,8.2c0,1.3-.2,2.6-.3,3.9,0,.4-.3.8-.7.9-.4,0-.8,0-1-.5,0-.1,0-.2,0-.3-.2-2-.3-4.1-.5-6.1,0-.5,0-1-.1-1.5,0-.9.6-1.6,1.4-1.6.8,0,1.5.7,1.5,1.6,0,1.2-.2,2.4-.3,3.6Z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
			background-repeat: no-repeat no-repeat;
			background-position: center center;
			background-size: cover;
		}
	}
`;
