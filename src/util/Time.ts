import {
	TimeScroll,
	minuteScrollValues,
} from 'Components/Molecule/TimeSelector/TimeSelector';
import { TimeUnit, timeUnit } from 'lib/const';
import moment from 'moment';
import 'moment-timezone';

// export interface ScrollTime {
// 	minute: number;
// 	hour: number | null;
// }

interface TimeScrollDict {
	value: number;
	time: number;
}

export const createTimeScrollDict = (timeScrollValues: TimeScroll[]) => {
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
		return value.toString();
	}
};

export const dateAfter = (minutes: number, timeZone: string) => {	
	return moment.tz(new Date().getTime() + minutes * 60000, timeZone).toDate();
};

export const convertTimeZone = (
	homeTimezone: string,
	timezone: string,
	homeDate: Date
) => {
	return new Date(
		moment
			.tz(homeDate, homeTimezone)
			.tz(timezone)
			.format('YYYY-MM-DD HH:mm:ss')
	);
};

export const calculateHourDifference = (
	homeTimezone: string,
	timezone: string
) => {
	// Get the current time in both time zones
	const homeTime = moment.tz(homeTimezone);
	const time = moment.tz(timezone);

	// Calculate the difference in hours

	const diffInHours = time.utcOffset() / 60 - homeTime.utcOffset() / 60;

	return diffInHours;
};

export const hoursToMilliseconds = (hours: number): number => {
	return hours * 60 * 60 * 1000;
};

