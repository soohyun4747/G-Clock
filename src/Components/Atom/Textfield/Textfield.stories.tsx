import { Story } from '@storybook/react';
import { Textfield, TextfieldProps } from './Textfield';
import { useState } from 'react';

export default {
	component: Textfield,
	title: 'Textfield',
};

const Template = () => {
	const [value, setValue] = useState<string>('');

	return (
		<Textfield
			value={value}
			setValue={setValue}
		/>
	);
};

export const Default: Story<TextfieldProps> = Template.bind({});

