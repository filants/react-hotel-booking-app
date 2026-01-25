import { Route, Routes } from 'react-router-dom';
import {
	Home,
	Register,
	Login,
	Room,
	Reservations,
	Occupancy,
	Error,
	AdminDashboard,
	AddRoom,
} from './pages';
import { AdminRoute, EmptyPageMessage, Header, ProtectedRoute } from './components';
import styled from 'styled-components';
import { errors } from './constants/errors';

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
					<Route element={<ProtectedRoute />}>
						<Route path="/reservations" element={<Reservations />} />
					</Route>
					<Route element={<AdminRoute />}>
						<Route path="/admin" element={<AdminDashboard />} />
						<Route path="/admin/occupancy" element={<Occupancy />} />
						<Route path="/admin/add-room" element={<AddRoom />} />
						<Route path="/admin/add-room/:id" element={<AddRoom />} />
					</Route>
					<Route path="/rooms/:id" element={<Room />} />
					<Route path="/403" element={<Error error={errors[403]} />} />
					<Route path="*" element={<Error error={errors[404]} />} />
				</Routes>
			</Content>
		</>
	);
};
