export const getDate = () => {
	const todayDateObject = new Date();
	const tomorrowDateObject = new Date(todayDateObject);
	tomorrowDateObject.setDate(tomorrowDateObject.getDate() + 7);

	const todayDate = todayDateObject.toLocaleDateString('en-CA');
	const tomorrowDate = tomorrowDateObject.toLocaleDateString('en-CA');

	return {
		todayDate,
		tomorrowDate,
	};
};
