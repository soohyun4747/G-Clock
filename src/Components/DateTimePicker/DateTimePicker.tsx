import { Calendar } from 'Components/Calendar/Calendar';
import { TimeSelector } from 'Components/TimeSelector/TimeSelector';
import { CalendarIcon } from 'Icons/Calendar';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import './DateTimePicker.css';
import { maxDate, maxDateTime, minDate, minDateTime } from 'lib/const';
import { IconButton } from 'Components/IconButton/IconButtons';

const calendarDivId = 'calendarDiv';

export interface DateTimePickerProps {
	label?: string;
	date: Date;
	setDate: React.Dispatch<SetStateAction<Date>>;
}

export function DateTimePicker(props: DateTimePickerProps) {
	const [dateStr, setDateStr] = useState<string>('');
	const [calendarVisible, setCalendarVisible] = useState<boolean>(false);

	const dateInputRef = useRef<HTMLInputElement>(null);
	const inputContainerRef = useRef<HTMLDivElement>(null);
	const calendarContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.addEventListener('click', handleClickOutside);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		setDateStr(dateToStrFormat(props.date));
	}, [props.date]);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			inputContainerRef.current &&
			!inputContainerRef.current.contains(event.target as Node) &&
			calendarContainerRef.current &&
			!calendarContainerRef.current.contains(event.target as Node)
		) {
			setCalendarVisible(false);
		}
	};

	const dateToStrFormat = (date: Date) => {
		const year = date.getFullYear();
		const month = monthToStrFormat(date.getMonth());
		const day = dayHourMinuteToStrFormat(date.getDate());
		const hour = dayHourMinuteToStrFormat(date.getHours());
		const minute = dayHourMinuteToStrFormat(date.getMinutes());

		return `${year}-${month}-${day}T${hour}:${minute}`;
	};

	const monthToStrFormat = (month: number) => {
		if (month.toString().length === 1) {
			return `0${month + 1}`;
		} else {
			return month + 1;
		}
	};

	const dayHourMinuteToStrFormat = (value: number) => {
		if (value.toString().length === 1) {
			return `0${value}`;
		} else {
			return value;
		}
	};

	const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDateStr(event.target.value);
	};

	const onBlurDate = (event: React.FocusEvent<HTMLInputElement, Element>) => {
		const dateValue = new Date(event.target.value);
		const dateValueTime = dateValue?.getTime();
		if (
			dateValueTime !== undefined &&
			minDateTime <= dateValueTime &&
			dateValueTime <= maxDateTime
		) {
			props.setDate(dateValue!);
		} else {
			setDateStr(dateToStrFormat(props.date));
		}
	};

	const onClickCalendarIcon = () => {
		setCalendarVisible((prev) => !prev);
	};

	return (
		<div>
			{props.label && <div className='DateTimePickerLabelDiv'>{props.label}</div>}
			<div
				ref={inputContainerRef}
				className='DateTimePickerParentDiv DateTimePickerInputDiv'>
				<IconButton
					icon={<CalendarIcon />}
					onClick={onClickCalendarIcon}
				/>
				<input
					type='datetime-local'
					ref={dateInputRef}
					className='DateTimePickerInput'
					value={dateStr}
					onChange={onChangeDate}
					min={minDate}
					max={maxDate}
					onBlur={onBlurDate}
				/>
			</div>
			{calendarVisible && (
				<div
					ref={calendarContainerRef}
					className='DateTimePickerParentDiv DateTimePickerCalendarTimeSelectorDiv'
					id={calendarDivId}>
					<Calendar
						date={props.date}
						setDate={props.setDate}
					/>
					<TimeSelector
						date={props.date}
						setDate={props.setDate}
					/>
				</div>
			)}
		</div>
	);
}
