import { useState } from 'react';
import validator from 'validator';
import { useAuth } from '../../contexts/AuthContext';
import { Title, Input, Button } from '../../components';
import styled from 'styled-components';

const RegisterContainer = ({ className }) => {
	const { apiError, clearApiError, authLoading, register } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const [errors, setErrors] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	});

	// VALIDATORS

	const validateEmail = (value) => {
		const trimmed = value.trim();
		if (!trimmed) return 'E-Mail is required';
		if (!validator.isEmail(trimmed)) return 'E-Mail not valid';
		return '';
	};

	const validatePassword = (value) => {
		const trimmed = value.trim();
		if (!trimmed) return 'Password is required';
		if (!validator.isStrongPassword(trimmed)) {
			return 'Password must be at least 8 characters with uppercase, lowercase, number, and symbol';
		}
		return '';
	};

	const validateRepeatPassword = (value, originalPassword) => {
		const trimmed = value.trim();
		if (!trimmed) return 'Please repeat your password';
		if (trimmed !== originalPassword.trim()) return 'Passwords do not match';
		return '';
	};

	const validateAll = () => {
		const emailError = validateEmail(email);
		const passwordError = validatePassword(password);
		const repeatPasswordError = validateRepeatPassword(repeatPassword, password);

		const nextErrors = {
			email: emailError,
			password: passwordError,
			repeatPassword: repeatPasswordError,
		};

		setErrors(nextErrors);

		return !Object.values(nextErrors).some(Boolean);
	};

	// BLUR HANDLERS

	const handleEmailBlur = () => {
		const emailError = email.trim() ? validateEmail(email) : '';
		setErrors((prev) => ({ ...prev, email: emailError }));
	};

	const handlePasswordBlur = () => {
		const passwordError = password.trim() ? validatePassword(password) : '';
		setErrors((prev) => ({ ...prev, password: passwordError }));
	};

	const handleRepeatPasswordBlur = () => {
		const repeatError = repeatPassword.trim()
			? validateRepeatPassword(repeatPassword, password)
			: '';
		setErrors((prev) => ({ ...prev, repeatPassword: repeatError }));
	};

	// SUBMIT

	const handleSubmit = async (e) => {
		e.preventDefault();

		clearApiError();

		const isValid = validateAll();
		if (!isValid) return;

		await register(email, password);
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

	const handleRepeatPasswordChange = ({ target }) => {
		setRepeatPassword(target.value);
		if (errors.repeatPassword) {
			setErrors((prev) => ({ ...prev, repeatPassword: '' }));
		}
		if (apiError) clearApiError();
	};

	return (
		<div className={className}>
			<form onSubmit={handleSubmit} noValidate>
				<Title>Sign Up</Title>
				<Input
					type="email"
					name="email"
					value={email}
					onChange={handleEmailChange}
					onBlur={handleEmailBlur}
				>
					E-Mail
				</Input>
				{errors.email && <div className="error">{errors.email}</div>}

				<Input
					type="password"
					name="password"
					value={password}
					onChange={handlePasswordChange}
					onBlur={handlePasswordBlur}
				>
					Password
				</Input>
				{errors.password && <div className="error">{errors.password}</div>}

				<Input
					type="password"
					name="repeatPassword"
					value={repeatPassword}
					onChange={handleRepeatPasswordChange}
					onBlur={handleRepeatPasswordBlur}
				>
					Repeat password
				</Input>
				{errors.repeatPassword && (
					<div className="error">{errors.repeatPassword}</div>
				)}

				<Button
					type="submit"
					className="primary"
					clickEvent={handleSubmit}
					disabled={authLoading}
				>
					{authLoading ? 'Loading...' : 'Register'}
				</Button>
				{apiError && <div className="form-error">{apiError}</div>}
			</form>
		</div>
	);
};

export const Register = styled(RegisterContainer)`
	width: 275px;
	margin: 0 auto;
	& label {
		margin-top: 15px;
	}
	& .error,
	.form-error {
		font-size: 13px;
		line-height: 20px;
		color: #d40000;
		&::before {
			display: inline-block;
			width: 10px;
			height: 10px;
			content: '';
			background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 28.7.3, SVG Export Plug-In . SVG Version: 9.03 Build 54978) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 384 384' style='enable-background:new 0 0 384 384;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23D40000;%7D%0A%3C/style%3E%3Cg%3E%3Cpath class='st0' d='M198.4,384c-4.5,0-9,0-13.5,0c-5.8-0.6-11.6-1-17.4-1.8c-35.3-4.8-67.3-17.8-95-40.3 c-41-33.3-64.8-76.1-70.9-128.7c-0.5-4.4-1-8.9-1.6-13.3c0-5,0-10,0-15c0.3-1.7,0.6-3.4,0.9-5.1c1.2-8.7,1.7-17.6,3.5-26.2 c11.5-53.4,40.5-94.9,86.8-123.8c41.6-26,87.1-34.2,135.2-25.4c44.7,8.1,82.1,29.7,111.2,64.6c39.5,47.4,53.2,102,41.2,162.5 c-8.5,43.1-30.4,78.7-63.9,107.1c-29.5,25-63.6,39.7-102.1,43.9C208,382.9,203.2,383.5,198.4,384z M236.4,191.7 c1.6-1.1,2.9-1.7,3.9-2.6c14.2-14.2,28.5-28.3,42.6-42.6c11.9-12.1,13.5-29.2,4.1-42.2c-11.8-16.3-34.5-17.9-49.3-3.3 c-14.3,14.1-28.4,28.4-42.6,42.6c-1,1-2.1,2-3.3,3.2c-1.2-1.1-2.2-2-3.1-3c-14.3-14.3-28.5-28.6-42.9-42.8 c-12.7-12.6-31.4-13.4-44.3-2.1c-14.4,12.5-14.8,33.6-0.8,47.7c14.1,14.3,28.4,28.4,42.6,42.6c1,1,2,2.1,3.4,3.7 c-1.5,1.2-2.8,2-3.9,3.1c-14.1,14.1-28.3,28.2-42.3,42.4c-10.9,11-13.2,26.4-5.9,39.1c10.6,18.7,35.4,21.9,51.1,6.4 c14.4-14.2,28.6-28.6,42.9-42.8c1-1,2.1-2,3.9-3.6c1,1.4,1.7,2.7,2.6,3.6c14.1,14.1,28.3,28.2,42.3,42.4 c8.1,8.2,17.9,11.9,29.2,9.8c12.5-2.3,21.2-9.7,25-22c3.8-12.3,0.9-23.2-8-32.4c-10.4-10.7-21.1-21.2-31.7-31.8 C247,202.3,242.2,197.5,236.4,191.7z'/%3E%3C/g%3E%3C/svg%3E%0A");
			background-repeat: no-repeat no-repeat;
			background-position: center center;
			background-size: cover;
			margin-right: 5px;
			flex-shrink: 0;
		}
	}
	& .error {
		margin-top: 10px;
		display: flex;
		align-items: baseline;
	}
	& .form-error {
		background-color: #d400002b;
		padding: 10px 5px;
		border-radius: 6px;
		text-align: center;
		margin-top: 15px;
	}
	& button[type='submit'] {
		margin-top: 35px;
	}
`;
