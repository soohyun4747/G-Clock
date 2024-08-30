import { Story } from '@storybook/react';
import { GroupButton, GroupButtonProps } from './GroupButton';
import { useState } from 'react';

export default {
	component: GroupButton,
	title: 'GroupButton',
};

const Template = (args: GroupButtonProps) => {
	const [value, setValue] = useState<number>(0);

	return <GroupButton {...args} value={value} setValue={setValue} />;
};

export const Default: Story<GroupButtonProps> = Template.bind({});

Default.args = {
	labels: ['am', 'pm'],
	width: 120,
	height: 30,
};
