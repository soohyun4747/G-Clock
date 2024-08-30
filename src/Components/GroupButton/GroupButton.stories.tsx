import { Story } from '@storybook/react';
import { GroupButton, GroupButtonProps } from './GroupButton';
import { useState } from 'react';
import { amPm } from 'lib/const';

export default {
	component: GroupButton,
	title: 'GroupButton',
};

const Template = (args: GroupButtonProps) => {
	const [value, setValue] = useState<number | string>(amPm.am);

	const onClickButton = (value: string | number) => {
		setValue(value);
	};

	return (
		<GroupButton
			{...args}
			value={value}
			buttonsProps={[
				{ label: 'am', value: 'am', onClick: onClickButton },
				{ label: 'pm', value: 'pm', onClick: onClickButton },
			]}
		/>
	);
};

export const Default: Story<GroupButtonProps> = Template.bind({});

Default.args = {
	width: 120,
	height: 30,
};
