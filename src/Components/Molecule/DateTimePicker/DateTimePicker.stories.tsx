import { useState } from 'react';
import { DateTimePicker, DateTimePickerProps } from './DateTimePicker';
import { Story } from '@storybook/react';

export default {
	component: DateTimePicker,
	title: 'DateTimePicker',
};

const Template = (args: DateTimePickerProps) => {
	const [date, setDate] = useState<Date>(args.date);

	const onChangeDate = (date: Date) => {
		setDate(date);
	};

	return (
		<DateTimePicker
			date={date}
			onChangeDate={onChangeDate}
			label={args.label}
		/>
	);
};
export const Default: Story<DateTimePickerProps> = Template.bind({});

Default.args = {
	label: 'From',
	date: new Date(),
};
