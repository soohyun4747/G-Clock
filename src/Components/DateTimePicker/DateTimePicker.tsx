import { Calendar } from 'Components/Calendar/Calendar';
import {
	TimeSelector,
	TimeSelectorProps,
} from 'Components/TimeSelector/TimeSelector';
import { CalendarIcon } from 'Icons/Calendar';
import { SetStateAction } from 'react';

export interface DateTimePickerProps {
	date: Date;
	setDate: React.Dispatch<SetStateAction<Date>>;
}

export function DateTimePicker(props: DateTimePickerProps) {
	return (
		<div className='DateTimePickerContainerDiv'>
			<div>
				<CalendarIcon />
				<div>
					<input/>
					<div>-</div>
					<input/>
					<div>-</div>
					<input/>
				</div>
				<div>
					<input/>
					<div>:</div>
					<input/>
				</div>
			</div>
			<div>
				<Calendar
					date={props.date}
					setDate={props.setDate}
				/>
				<TimeSelector
					date={props.date}
					setDate={props.setDate}
				/>
			</div>
		</div>
	);
}
