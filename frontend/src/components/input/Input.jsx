import styled from 'styled-components';

const InputContainer = ({ type, name, value, children, className, width, ...props }) => (
	<div className={className}>
		<label htmlFor={name}>{children}</label>
		<input type={type} name={name} id={name} value={value} {...props} />
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
		margin-bottom: 5px;
	}
	& input {
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
`;
