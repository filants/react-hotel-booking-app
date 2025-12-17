import { EditSearch } from './components';
import styled from 'styled-components';

const TitleContainer = ({ className, children, edit = false, ...props }) => {
	return (
		<div className={className}>
			<h1>{children}</h1>
			{edit && <EditSearch {...props} />}
		</div>
	);
};

export const Title = styled(TitleContainer)`
	border-bottom: 1px solid #d99a29;
	padding-bottom: 10px;
	margin-bottom: 30px;
	display: flex;
	justify-content: space-between;
	& h1 {
		font: 600 22px/26px 'Montserrat';
		letter-spacing: 0.35px;
	}
`;
