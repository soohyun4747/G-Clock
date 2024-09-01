import { Story } from '@storybook/react';
import { PlaceSearcher, PlaceSearcherProps, StateCity } from './PlaceSearcher';

export default {
	component: PlaceSearcher,
	title: 'PlaceSearcher',
};

const Template = (args: PlaceSearcherProps) => {
	return <PlaceSearcher {...args} />;
};

export const Default: Story<PlaceSearcherProps> = Template.bind({});

Default.args = {
	onAdd: (stateCity: StateCity) => {
		console.log(stateCity);
	},
};
