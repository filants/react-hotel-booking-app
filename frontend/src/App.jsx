import { Route, Routes } from 'react-router-dom';
import { Home, Register, Login, Room } from './pages';
import { Header } from './components';
import styled from 'styled-components';

const Content = styled.div``;

export const App = () => {
	return (
		<>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/:id" element={<Room />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Content>
		</>
	);
};
