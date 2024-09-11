import { Calendar } from 'Components/Atom/Calendar/Calendar';
import { TimeSelector } from 'Components/Molecule/TimeSelector/TimeSelector';
import { CalendarIcon } from 'Icons/Calendar';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import './DateTimePicker.css';
import { maxDate, maxDateTime, minDate, minDateTime } from 'lib/const';
import { IconButton } from 'Components/Atom/IconButton/IconButtons';
import { dayHourMinuteToStrFormat } from 'util/Time';
import { onEnterKeyDown } from 'util/Component';

const calendarDivId = 'calendarDiv';

export interface DateTimePickerProps {
	label?: string;
	style?: React.CSSProperties;
	date: Date;
	onChangeDate: (date: Date) => void;
}

export function DateTimePicker(props: DateTimePickerProps) {
	const [dateStr, setDateStr] = useState<string>('');
	const [calendarVisible, setCalendarVisible] = useState<boolean>(false);

	const dateInputRef = useRef<HTMLInputElement>(null);
	const inputContainerRef = useRef<HTMLDivElement>(null);
	const calendarContainerRef = useRef<HTMLDivElement>(null);
	const calendarIconRef = useRef<HTMLDivElement>(null);

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
			calendarIconRef.current &&
			!calendarIconRef.current.contains(event.target as Node) &&
			calendarContainerRef.current &&
			!calendarContainerRef.current.contains(event.target as Node)
		) {
			setCalendarVisible(false);
		}
	};

	const dateToStrFormat = (date: Date) => {
		const year = date.getFullYear();
		const month = monthToStrFormat(date.getMonth() + 1);
		const day = dayHourMinuteToStrFormat(date.getDate());
		const hour = dayHourMinuteToStrFormat(date.getHours());
		const minute = dayHourMinuteToStrFormat(date.getMinutes());

		return `${year}-${month}-${day}T${hour}:${minute}`;
	};

	const monthToStrFormat = (month: number) => {
		if (month.toString().length === 1) {
			return `0${month}`;
		} else {
			return month;
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
			props.onChangeDate(dateValue!);
		}
		setDateStr(dateToStrFormat(props.date));
	};

	const onClickCalendarIcon = () => {
		setCalendarVisible((prev) => !prev);
	};

	return (
		<div className='DateTimePickerContainerDiv'>
			{props.label && (
				<div className='DateTimePickerLabelDiv'>{props.label}</div>
			)}
			<div
				style={props.style}
				ref={inputContainerRef}
				className='DateTimePickerParentDiv DateTimePickerInputDiv'>
				<div ref={calendarIconRef}>
					<IconButton
						icon={<CalendarIcon />}
						onClick={onClickCalendarIcon}
					/>
				</div>
				<input
					type='datetime-local'
					ref={dateInputRef}
					className='DateTimePickerInput'
					value={dateStr}
					onChange={onChangeDate}
					min={minDate}
					max={maxDate}
					onBlur={onBlurDate}
					onKeyDown={onEnterKeyDown}
				/>
			</div>
			{calendarVisible && (
				<div
					ref={calendarContainerRef}
					className='DateTimePickerParentDiv DateTimePickerCalendarTimeSelectorDiv'
					id={calendarDivId}>
					<Calendar
						date={props.date}
						onChangeDate={props.onChangeDate}
					/>
					<TimeSelector
						date={props.date}
						onChangeDate={props.onChangeDate}
					/>
				</div>
			)}
		</div>
	);
}
