import { Story } from '@storybook/react';
import { TimeSelector, TimeSelectorProps } from './TimeSelector';
import { useState } from 'react';
import { DateTimePickerProps } from 'Components/Molecule/DateTimePicker/DateTimePicker';

export default {
	component: TimeSelector,
	title: 'TimeSelector',
};

const Template = (args: TimeSelectorProps) => {
	const [date, setDate] = useState<Date>(args.date);

	const onChangeDate = (date: Date) => {
		setDate(date);
	};

	return (
		<TimeSelector
			date={date}
			// setDate={setDate}
			onChangeDate={onChangeDate}
		/>
	);
};

export const Default: Story<DateTimePickerProps> = Template.bind({});

Default.args = {
	date: new Date(),
};
