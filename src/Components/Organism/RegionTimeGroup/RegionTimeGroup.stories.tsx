import { Story } from '@storybook/react';
import { RegionTimeGroup, RegionTimeGroupProps } from './RegionTimeGroup';
import { useState } from 'react';
import { SeoulInfo } from 'lib/const';

export default {
	component: RegionTimeGroup,
	title: 'RegionTimeGroup',
};

const Template = (args: RegionTimeGroupProps) => {
	const [startDate, setStartDate] = useState<Date>(new Date());
	const [endDate, setEndDate] = useState<Date>(new Date());

	const onChangeStartDate = (date: Date) => {
		setStartDate(date);
	};

	const onChangeEndDate = (date: Date) => {
		setEndDate(date);
	};

	return (
		<RegionTimeGroup
			{...args}
			startDate={startDate}
			onChangeStartDate={onChangeStartDate}
			endDate={endDate}
			onChangeEndDate={onChangeEndDate}
		/>
	);
};

export const Default: Story<RegionTimeGroupProps> = Template.bind({});

Default.args = {
	stateCity: SeoulInfo,
};
