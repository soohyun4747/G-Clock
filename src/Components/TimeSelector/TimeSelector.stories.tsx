import { Story } from '@storybook/react';
import { TimeSelector, TimeSelectorProps } from './TimeSelector';
import { SetStateAction, useState } from 'react';
import { amPm } from 'lib/const';

export default {
	component: TimeSelector,
	title: 'TimeSelector',
};

const Template = (args: TimeSelectorProps) => {
	// const [minute, setMinute] = useState<number>(args.minute);
	// const [hour, setHour] = useState<number>(args.hour);
	// const [amOrPm, setAmOrPm] = useState<string | number>(amPm.am);
	const [date, setDate] = useState<Date>(args.date);

	return (
		<TimeSelector
			date={date}
			setDate={setDate}
		/>
	);
};

export const Default: Story<TimeSelectorProps> = Template.bind({});

Default.args = {
	date: new Date(),
};
