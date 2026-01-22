import { EditSearch } from './components';
import { Button } from '../';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TitleContainer = ({ className, children, edit = false, variant, ...props }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<h1>{children}</h1>
			{edit && <EditSearch variant={variant} {...props} />}
			{variant === 'availability' && (
				<Button
					className="secondary"
					onClick={() => navigate('/admin/occupancy')}
				>
					Back
				</Button>
			)}
		</div>
	);
};

export const Title = styled(TitleContainer)`
	border-bottom: 1px solid #d99a29;
	padding-bottom: 10px;
	margin-bottom: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	& h1 {
		font: 600 22px/26px 'Montserrat';
		letter-spacing: 0.35px;
	}
	& button.secondary {
		width: 90px;
		margin-top: 0;
	}
`;
