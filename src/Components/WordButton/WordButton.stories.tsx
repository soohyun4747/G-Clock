import { Story } from '@storybook/react';
import { WordButton, WordButtonProps } from './WordButton';

export default {
	component: WordButton,
	title: 'WordButton',
};

const Template = (args: WordButtonProps) => {
	return <WordButton {...args} />;
};

export const Default: Story<WordButtonProps> = Template.bind({});

Default.args = {
    label: 'add'
};
