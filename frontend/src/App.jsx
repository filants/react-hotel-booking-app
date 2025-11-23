import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Home } from './pages';
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
					<Route path="/login" element={<div>Login</div>} />
					<Route path="/register" element={<div>Register</div>} />
				</Routes>
			</Content>
		</>
	);
};
