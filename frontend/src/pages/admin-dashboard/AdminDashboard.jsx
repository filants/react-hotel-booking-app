import { Link } from 'react-router-dom';
import { Title, FullPageContainer, PanelCard } from '../../components';

export const AdminDashboard = () => (
	<FullPageContainer>
		<Title>Admin panel</Title>
		<div className="cards-container">
			<Link to="/admin/occupancy">
				<PanelCard type="occupancy">Hotel occupancy</PanelCard>
			</Link>
			<Link to="/admin/add-room">
				<PanelCard type="add-room">Add hotel room</PanelCard>
			</Link>
		</div>
	</FullPageContainer>
);
