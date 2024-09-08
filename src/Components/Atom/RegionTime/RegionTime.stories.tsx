import { Story } from '@storybook/react';
import { RegionTime, RegionTimeProps } from './RegionTime';
import { useState } from 'react';
import { SeoulInfo } from 'lib/const';

export default {
	component: RegionTime,
	title: 'RegionTime',
};

const Template = (args: RegionTimeProps) => {
	return <RegionTime {...args} />;
};

export const Default: Story<RegionTimeProps> = Template.bind({});

Default.args = {
	stateCity: SeoulInfo,
    startDate: new Date(),
    endDate: new Date()
};
