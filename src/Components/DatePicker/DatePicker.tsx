import { useMemo, useState } from 'react';
import './DatePicker.css';
import { Calendar } from 'Icons/Calendar/Calendar';

export function DatePicker() {
	const [date, setDate] = useState<Date>(new Date());

	const dateStr = useMemo(() => {
		return date.toLocaleDateString().replaceAll('. ', ' - ').slice(0, -1);
	}, [date]);

	return (
		<div className='DatePickerContainerDiv'>
			<div className='DatePickerInputDiv'>
				<Calendar />
				<input
					className='DatePickerInput'
					value={dateStr}
				/>
			</div>
			<div>
                <span></span>
            </div>
		</div>
	);
}
