import { FormResponse } from '../';
import styled from 'styled-components';

const InputContainer = ({
	type,
	name,
	value,
	children,
	className,
	width,
	istextarea,
	isRequired,
	error,
	...props
}) => (
	<div className={className}>
		<label htmlFor={name}>{children}</label>
		{istextarea ? (
			<textarea name={name} id={name} value={value} {...props} rows="5"></textarea>
		) : (
			<>
				<input type={type} name={name} id={name} value={value} {...props} />
				{typeof error === 'string' && (
					<FormResponse type="error-input">{error}</FormResponse>
				)}
			</>
		)}
	</div>
);

export const Input = styled(InputContainer)`
	display: flex;
	flex-direction: column;
	flex: ${({ width }) => (width ? '0 0 auto' : '1 1 0')};
	width: ${({ width }) => width || 'auto'};
	min-width: 0;
	& label {
		font-style: italic;
		font-weight: 450;
		color: rgba(82, 87, 89, 1);
		margin: 15px 0 5px;
	}
	& input:not([type='file']),
	textarea {
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
	${({ isRequired }) =>
		isRequired &&
		`
		& label::after {
			content: "*";
			margin-left: 3px;
			color: #d40000;
		}
	`}
	${({ error }) =>
		error && `& input:not([type='file']), & textarea {border: 1px solid #d40000;}`}
`;
