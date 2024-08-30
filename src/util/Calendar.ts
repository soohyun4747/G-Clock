export const getDatesInMonth = (year: number, month: number): Date[][] => {
	let startDate = new Date(year, month, 1); // Month is zero-based
	let endDate = new Date(year, month + 1, 0); // Day 0 is the last day of the previous month

	const startDateDay = startDate.getDay();
	const endDateDay = endDate.getDay();

	if (startDateDay > 0) {
		startDate = new Date(year, month, -(startDateDay - 1));
	}
	if (endDateDay < 6) {
		endDate = new Date(year, month + 1, 6 - endDateDay);
	}

	const datesArray: Date[][] = [];
	let dayCnt = 0;

	for (
		let date = startDate;
		date <= endDate;
		date.setDate(date.getDate() + 1)
	) {
		if (dayCnt === 0) {
			datesArray.push([]);
		}
		datesArray.at(-1)?.push(new Date(date));
		dayCnt++;
		if (dayCnt === 7) {
			dayCnt = 0;
		}
	}

	return datesArray;
};
