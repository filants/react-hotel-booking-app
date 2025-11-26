import { Route, Routes } from 'react-router-dom';
import { Home, Register, Login } from './pages';
import { Header } from './components';
import styled from 'styled-components';

const Content = styled.div`
	padding: 40px;
`;

export const App = () => {
	return (
		<>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Content>
		</>
	);
};
