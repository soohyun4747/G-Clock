import { Story } from '@storybook/react';
import { RegionTime, RegionTimeProps } from './RegionTime';
import { useState } from 'react';

export default {
	component: RegionTime,
	title: 'RegionTime',
};

const Template = (args: RegionTimeProps) => {
	return <RegionTime {...args} />;
};

export const Default: Story<RegionTimeProps> = Template.bind({});

Default.args = {
	stateCity: { country: 'South Korea', name: 'Seoul', code: 'SE' },
    homeTimeDiff: 7,
    startDate: new Date(),
    endDate: new Date()
};
