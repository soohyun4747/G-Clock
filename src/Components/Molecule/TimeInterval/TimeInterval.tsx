import { Textfield } from 'Components/Atom/Textfield/Textfield';
import { useEffect, useState } from 'react';
import {
	convertMilliseconds,
	daysToMsec,
	hoursToMsec,
	minutesToMsec,
} from 'util/Time';
import './TimeInterval.css';

interface TimeIntervalProps {
	timeInterval: number;
	onChangeTimeRange: (timeDiff: number) => void;
}

export function TimeInterval(props: TimeIntervalProps) {
	const [day, setDay] = useState<number>(0);
	const [dayInput, setDayInput] = useState<number | string>(0);
	const [hour, setHour] = useState<number>(0);
	const [hourInput, setHourInput] = useState<number | string>(0);
	const [minute, setMinute] = useState<number>(0);
	const [minuteInput, setMinuteInput] = useState<number | string>(0);

	useEffect(() => {
		setStateDayHourMinute(props.timeInterval);
	}, [props.timeInterval]);

	const setStateDayHourMinute = (timeInterval: number) => {
		const { days, hours, minutes } = convertMilliseconds(timeInterval);
		setDay(days);
		setDayInput(days);
		setHour(hours);
		setHourInput(hours);
		setMinute(minutes);
		setMinuteInput(minutes);
	};

	const onBlurDay = () => {
		const numDay = Math.round(Number(dayInput));

		if (isNaN(numDay) || numDay < 0) {
			setDayInput(day);
		} else {
			const dayDiff = numDay - day;
			props.onChangeTimeRange(props.timeInterval + daysToMsec(dayDiff));
		}
	};

	const onBlurHour = () => {
		let numHour = Math.round(Number(hourInput));

		if (isNaN(numHour) || numHour < 0) {
			setHourInput(hour);
		} else {
			if (23 < numHour) {
				numHour = 23;
			}
			const hourDiff = numHour - hour;
			props.onChangeTimeRange(props.timeInterval + hoursToMsec(hourDiff));
		}
	};

	const onBlurMinute = () => {
		let numMinute = Math.round(Number(minuteInput));

		if (isNaN(numMinute) || numMinute < 0) {
			setMinuteInput(minute);
		} else {
			if (59 < numMinute) {
				numMinute = 59;
			}
			const minuteDiff = numMinute - minute;
			props.onChangeTimeRange(
				props.timeInterval + minutesToMsec(minuteDiff)
			);
		}
	};

	return (
		<div className='timeIntervalDiv'>
			<div className='timeIntervalGroupDiv timeIntervalPadding'>
				<Textfield
					style={{
						width: 67,
						marginRight: 8,
						height: 36,
					}}
					inputAttributes={{
						style: { textAlign: 'center' },
						'aria-label': 'day',
					}}
					value={dayInput}
					setValue={setDayInput}
					onBlur={onBlurDay}
				/>
				<div>day</div>
			</div>
			<div className='timeIntervalGroupDiv timeIntervalPadding'>
				<Textfield
					style={{
						width: 67,
						marginRight: 8,
						height: 36,
					}}
					inputAttributes={{
						style: { textAlign: 'center' },
						'aria-label': 'hour',
					}}
					value={hourInput}
					setValue={setHourInput}
					onBlur={onBlurHour}
				/>
				<div>hour</div>
			</div>
			<div className='timeIntervalGroupDiv'>
				<Textfield
					style={{
						width: 67,
						marginRight: 8,
						height: 36,
					}}
					inputAttributes={{
						style: { textAlign: 'center' },
						'aria-label': 'minute',
					}}
					value={minuteInput}
					setValue={setMinuteInput}
					onBlur={onBlurMinute}
				/>
				<div>minute</div>
			</div>
		</div>
	);
}
