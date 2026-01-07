import { Route, Routes } from 'react-router-dom';
import { Home, Register, Login, Room, Reservations, Occupancy } from './pages';
import { Header, ProtectedRoute } from './components';
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
					<Route
						path="/occupancy"
						element={
							<ProtectedRoute>
								<Occupancy />
							</ProtectedRoute>
						}
					/>
					<Route path="/rooms/:id" element={<Room />} />
				</Routes>
			</Content>
		</>
	);
};
