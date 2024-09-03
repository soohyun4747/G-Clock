import { Story } from '@storybook/react';
import { Dropdown, DropdownProps } from './Dropdown';
import { useState } from 'react';
import { amPm, timeUnit } from 'lib/const';

export default {
	component: Dropdown,
	title: 'Dropdown',
};

const Template = (args: DropdownProps) => {
	const [value, setValue] = useState<string | number>(timeUnit.hour);    

	return (
		<Dropdown
			{...args}
			value={value}
			setValue={setValue}
		/>
	);
};

export const Default: Story<DropdownProps> = Template.bind({});

Default.args = {
	options: [
		{ value: timeUnit.min, label: timeUnit.min },
		{ value: timeUnit.hour, label: timeUnit.hour },
	],
};
