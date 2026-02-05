import { useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearApiError, register } from '../../store/slices/authSlice';
import { Title, Input, Button, FormResponse } from '../../components';
import styled from 'styled-components';

const RegisterContainer = ({ className }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { apiError, authLoading } = useSelector((s) => s.auth);

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

		dispatch(clearApiError());

		const isValid = validateAll();
		if (!isValid) return;

		const action = await dispatch(register({ email, password }));

		if (register.fulfilled.match(action)) {
			navigate('/');
		}
	};

	// HANDLERS

	const handleEmailChange = ({ target }) => {
		setEmail(target.value);
		if (errors.email) {
			setErrors((prev) => ({ ...prev, email: '' }));
		}
		if (apiError) dispatch(clearApiError());
	};

	const handlePasswordChange = ({ target }) => {
		setPassword(target.value);
		if (errors.password) {
			setErrors((prev) => ({ ...prev, password: '' }));
		}
		if (apiError) dispatch(clearApiError());
	};

	const handleRepeatPasswordChange = ({ target }) => {
		setRepeatPassword(target.value);
		if (errors.repeatPassword) {
			setErrors((prev) => ({ ...prev, repeatPassword: '' }));
		}
		if (apiError) dispatch(clearApiError());
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
					onBlur={handlePasswordBlur}
					isRequired
				>
					Password
				</Input>
				{errors.password && (
					<FormResponse type="error-input">{errors.password}</FormResponse>
				)}

				<Input
					type="password"
					name="repeatPassword"
					value={repeatPassword}
					onChange={handleRepeatPasswordChange}
					onBlur={handleRepeatPasswordBlur}
					isRequired
				>
					Repeat password
				</Input>
				{errors.repeatPassword && (
					<FormResponse type="error-input">
						{errors.repeatPassword}
					</FormResponse>
				)}

				<Button
					type="submit"
					className="primary"
					clickEvent={handleSubmit}
					disabled={authLoading}
				>
					{authLoading ? 'Loading...' : 'Register'}
				</Button>

				{apiError && <FormResponse type="error">{apiError}</FormResponse>}
			</form>
		</div>
	);
};

export const Register = styled(RegisterContainer)`
	width: 275px;
	margin: 0 auto;
	& button[type='submit'] {
		margin-top: 35px;
	}
`;
