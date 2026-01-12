import Select from 'react-select';
import styled from 'styled-components';

const SelectFieldContainer = ({
	name = 'category',
	options,
	roomCategory,
	setRoomCategory,
	width,
	className,
	isRequired,
	error,
}) => {
	return (
		<div className={className}>
			<label htmlFor={name}>Room category</label>
			<Select
				inputId={name}
				options={options}
				value={options.find((o) => o.value === roomCategory) || null}
				onChange={(selected) => setRoomCategory(selected?.value || '')}
				placeholder="Select..."
				styles={{
					control: (base) => ({
						...base,
						borderColor: error ? '#d40000' : '#d0d0d0',
						borderRadius: '4px',
						minHeight: '32px',
						height: '32px',
						boxShadow: 'none',
						'&:hover': { borderColor: error ? '#d40000' : '#d99a29' },
					}),
					option: (base, state) => ({
						...base,
						background: state.isSelected ? '#d99a29' : 'white',
						'&:hover': { background: '#d99a29', color: 'white' },
					}),
					indicatorsContainer: (base) => ({
						...base,
						height: 32,
					}),
					valueContainer: (base) => ({
						...base,
						height: 32,
						padding: '0 6px',
					}),
					input: (base) => ({
						...base,
						margin: 0,
						padding: 0,
					}),
				}}
			/>
		</div>
	);
};

export const SelectField = styled(SelectFieldContainer)`
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
	${({ isRequired }) =>
		isRequired &&
		`
		& label::after {
			content: "*";
			margin-left: 3px;
			color: #d40000;
		}
	`}
`;
