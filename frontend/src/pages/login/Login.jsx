import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Title, Input, Button, FormResponse } from '../../components';
import styled from 'styled-components';

const LoginContainer = ({ className }) => {
	const { apiError, clearApiError, authLoading, login } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

	// VALIDATORS

	const validateEmail = (value) => {
		const trimmed = value.trim();
		if (!trimmed) return 'E-Mail is required';
		return '';
	};

	const validatePassword = (value) => {
		const trimmed = value.trim();
		if (!trimmed) return 'Password is required';
		return '';
	};

	const validateAll = () => {
		const emailError = validateEmail(email);
		const passwordError = validatePassword(password);

		const nextErrors = {
			email: emailError,
			password: passwordError,
		};

		setErrors(nextErrors);

		return !Object.values(nextErrors).some(Boolean);
	};

	// SUBMIT

	const handleSubmit = async (e) => {
		e.preventDefault();

		clearApiError();

		const isValid = validateAll();
		if (!isValid) return;

		await login(email, password);
	};

	// HANDLERS

	const handleEmailChange = ({ target }) => {
		setEmail(target.value);
		if (errors.email) {
			setErrors((prev) => ({ ...prev, email: '' }));
		}
		if (apiError) clearApiError();
	};

	const handlePasswordChange = ({ target }) => {
		setPassword(target.value);
		if (errors.password) {
			setErrors((prev) => ({ ...prev, password: '' }));
		}
		if (apiError) clearApiError();
	};

	return (
		<div className={className}>
			<form onSubmit={handleSubmit} noValidate>
				<Title>Sign In</Title>
				<Input
					type="email"
					name="email"
					value={email}
					onChange={handleEmailChange}
					isRequired
				>
					E-Mail
				</Input>
				{errors.email && (
					<FormResponse type="error-input">{errors.email}</FormResponse>
				)}

				<Input
					type="password"
					name="password"
					value={password}
					onChange={handlePasswordChange}
					isRequired
				>
					Password
				</Input>
				{errors.password && (
					<FormResponse type="error-input">{errors.password}</FormResponse>
				)}

				<Button
					className="primary"
					type="submit"
					clickEvent={handleSubmit}
					disabled={authLoading}
				>
					{authLoading ? 'Loading...' : 'Login'}
				</Button>
				<Link to="/register">
					<Button className="secondary">Register</Button>
				</Link>

				{apiError && <FormResponse type="error">{apiError}</FormResponse>}
			</form>
		</div>
	);
};

export const Login = styled(LoginContainer)`
	width: 275px;
	margin: 0 auto;
	& button[type='submit'] {
		margin-top: 35px;
	}
`;
