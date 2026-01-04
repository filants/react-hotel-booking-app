export const getErrorMessage = (error, fallback = 'Internal server error') =>
	error?.response?.data?.error ||
	error?.response?.data?.message ||
	error?.message ||
	fallback;
