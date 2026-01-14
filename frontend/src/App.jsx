import { Route, Routes } from 'react-router-dom';
import {
	Home,
	Register,
	Login,
	Room,
	Reservations,
	Occupancy,
	AddRoom,
	Forbidden,
	AdminDashboard,
} from './pages';
import { AdminRoute, Header, ProtectedRoute } from './components';
import styled from 'styled-components';

const Content = styled.div``;

export const App = () => {
	return (
		<>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/reservations"
						element={
							<ProtectedRoute>
								<Reservations />
							</ProtectedRoute>
						}
					/>
					<Route element={<AdminRoute />}>
						<Route path="/admin" element={<AdminDashboard />} />
						<Route path="/admin/occupancy" element={<Occupancy />} />
						<Route path="/admin/add-room" element={<AddRoom />} />
					</Route>
					<Route path="/rooms/:id" element={<Room />} />
					<Route path="/403" element={<Forbidden />} />
				</Routes>
			</Content>
		</>
	);
};
