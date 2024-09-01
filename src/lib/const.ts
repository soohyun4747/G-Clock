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

export const minArray = [
	{ value: null, label: '' },
	{ value: null, label: '' },
	{ value: 0, label: '00' },
	{ value: 5, label: '05' },
	{ value: 10, label: '10' },
	{ value: 15, label: '15' },
	{ value: 20, label: '20' },
	{ value: 25, label: '25' },
	{ value: 30, label: '30' },
	{ value: 35, label: '35' },
	{ value: 40, label: '40' },
	{ value: 45, label: '45' },
	{ value: 50, label: '50' },
	{ value: 55, label: '55' },
	{ value: null, label: '' },
	{ value: null, label: '' },
];

export const hourArray = [
	{ value: null, label: '' },
	{ value: null, label: '' },
	{ value: 1, label: '01' },
	{ value: 2, label: '02' },
	{ value: 3, label: '03' },
	{ value: 4, label: '04' },
	{ value: 5, label: '05' },
	{ value: 6, label: '06' },
	{ value: 7, label: '07' },
	{ value: 8, label: '08' },
	{ value: 9, label: '09' },
	{ value: 10, label: '10' },
	{ value: 11, label: '11' },
	{ value: 12, label: '12' },
	{ value: null, label: '' },
	{ value: null, label: '' },
];

export const timeScrollValues = [
	{
		min: 0,
		max: 18,
		value: 0,
		time: { minute: 0, hour: 1 },
	},
	{
		min: 19,
		max: 55,
		value: 36,
		time: { minute: 5, hour: 2 },
	},
	{
		min: 56,
		max: 92,
		value: 72,
		time: { minute: 10, hour: 3 },
	},
	{
		min: 93,
		max: 129,
		value: 108,
		time: { minute: 15, hour: 4 },
	},
	{
		min: 130,
		max: 166,
		value: 144,
		time: { minute: 20, hour: 5 },
	},
	{
		min: 167,
		max: 203,
		value: 180,
		time: { minute: 25, hour: 6 },
	},
	{
		min: 204,
		max: 240,
		value: 216,
		time: { minute: 30, hour: 7 },
	},
	{
		min: 241,
		max: 277,
		value: 252,
		time: { minute: 35, hour: 8 },
	},
	{
		min: 278,
		max: 314,
		value: 288,
		time: { minute: 40, hour: 9 },
	},
	{
		min: 315,
		max: 351,
		value: 324,
		time: { minute: 45, hour: 10 },
	},
	{
		min: 352,
		max: 388,
		value: 360,
		time: { minute: 50, hour: 11 },
	},
	{
		min: 389,
		max: 425,
		value: 396,
		time: { minute: 55, hour: 12 },
	},
];

export const amPm = {
	am: 'am',
	pm: 'pm',
};

export const minDate = '1000-01-01';
export const maxDate = '9999-12-31';

export const minDateTime = new Date(minDate).getTime();
export const maxDateTime = new Date(maxDate).getTime();
