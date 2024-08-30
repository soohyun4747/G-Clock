import { Story } from '@storybook/react';
import { TimeSelector, TimeSelectorProps } from './TimeSelector';
import { useState } from 'react';

export default {
	component: TimeSelector,
	title: 'TimeSelector',
};

const Template = (args: TimeSelectorProps) => {
	const [minute, setMinute] = useState<number>(args.minute);
	const [hour, setHour] = useState<number>(args.hour);

    console.log({hour, minute});
    
	return <TimeSelector
		minute={minute}
		hour={hour}
		setMinute={setMinute}
		setHour={setHour}
	/>;
};

export const Default: Story<TimeSelectorProps> = Template.bind({});

Default.args = {
	hour: 2,
	minute: 30,
};
