export const formattedDate = (date) => {
	const dateObject = new Date(date);
	date = dateObject.toLocaleDateString('en-CA');

	return date.split('-').reverse().join('/');
};
