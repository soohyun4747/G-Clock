import { useState } from "react";
import { DateTimePicker, DateTimePickerProps } from "./DateTimePicker";
import { Story } from "@storybook/react";

export default {
    component: DateTimePicker,
    title: 'DateTimePicker',
}

const Template = (args: DateTimePickerProps) => {
    const [date, setDate] = useState<Date>(args.date);

	return (
		<DateTimePicker
			date={date}
			setDate={setDate}
		/>
	);
}
export const Default: Story<DateTimePickerProps> = Template.bind({});

Default.args = {
    date: new Date()

}