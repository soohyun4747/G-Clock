export const months: string[] = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const amPm = {
	am: 'am',
	pm: 'pm',
};

export const minDate = '1000-01-01';
export const maxDate = '9999-12-31';

export const minDateTime = new Date(minDate).getTime();
export const maxDateTime = new Date(maxDate).getTime();

export const timeUnit = {
	min: 'min',
	hour: 'hour',
	day: 'day',
} as const;

export type TimeUnit = (typeof timeUnit)[keyof typeof timeUnit];

export const SeoulInfo = {
	country: 'South Korea',
	name: 'Seoul',
	latitude: 37.5326,
	longitude: 127.024612,
};

export const SeoulTimezone = 'Asia/Seoul';

export const minuteToMsec = 60000;
export const hourToMsec = minuteToMsec * 60;
export const dayToMsec = hourToMsec * 24;