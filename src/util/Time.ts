import { timeScrollValues } from 'lib/const';

interface ScrollTime {
	minute: number;
	hour: number;
}

interface TimeScrollDict {
	value: number;
	time: ScrollTime;
}

export const createTimeScrollDict = () => {
	const timeScrollDict: { [key: number]: TimeScrollDict } = {};

	timeScrollValues.forEach((timeScroll) => {
		for (let i = timeScroll.min; i <= timeScroll.max; i++) {
			timeScrollDict[i] = {
				value: timeScroll.value,
				time: timeScroll.time,
			};
		}
	});

	return timeScrollDict;
};

export const getDateMinuteInFiveMulti = (date: Date) => {
	const minutes = date.getMinutes();
	const left = minutes % 5;

	if (left <= 2) {
		return minutes - left;
	} else {
		return minutes + (5 - left);
	}
};

export const dayHourMinuteToStrFormat = (value: number) => {
	if (value.toString().length === 1) {
		return `0${value}`;
	} else {
		return value;
	}
};

export const dateAfter = (minutes: number) => {
	return new Date(new Date().getTime() + minutes * 60000);
};
