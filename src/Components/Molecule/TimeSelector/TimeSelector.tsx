import { amPm } from 'lib/const';
import './TimeSelector.css';
import { SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { createTimeScrollDict, dayHourMinuteToStrFormat } from 'util/Time';
import { GroupButton } from 'Components/Atom/GroupButton/GroupButton';

export interface TimeSelectorProps {
	date: Date;
	onChangeDate: (date: Date) => void;
}

export function TimeSelector(props: TimeSelectorProps) {
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

	const hourDivRef = useRef<HTMLDivElement>(null);
	const minDivRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setStateHourAndScroll(props.date);
		setStateMinuteAndScroll(props.date);
	}, [props.date]);

	const setStateMinuteAndScroll = (date: Date) => {
		const scrollVal = minuteScrollValues.find(
			(timeScroll) => timeScroll.time === date.getMinutes()
		)?.value;

		if (scrollVal !== undefined) {
			minuteScrollTo(scrollVal);
		}
	};

	const setStateHourAndScroll = (date: Date) => {
		const dateHours = getDateHours(date);
		const scrollVal = hourScrollValues.find(
			(timeScroll) => timeScroll.time === dateHours
		)?.value;
		if (scrollVal !== undefined) {
			hourScrollTo(scrollVal);
		}
	};

	const getDateHours = (date: Date) => {
		const hours = date.getHours();
		if (hours > 12) {
			return hours - 12;
		}
		return hours;
	};

	const minuteScrollTo = (value: number) => {
		if (minDivRef.current) {
			minDivRef.current.scrollTop = value;
		}
	};

	const hourScrollTo = (value: number) => {
		if (hourDivRef.current) {
			hourDivRef.current.scrollTop = value;
		}
	};

	const handleScrollHour = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		setTimeoutId(
			setTimeout(() => {
				setStateHourOnScrollEnd();
			}, 200)
		);
	};

	const handleScrollMinute = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		setTimeoutId(
			setTimeout(() => {
				setStateMinuteOnScrollEnd();
			}, 200)
		);
	};

	const setStateHourOnScrollEnd = () => {
		if (hourDivRef.current) {
			const { scrollTop } = hourDivRef.current;
			const scrollDict = hourScrollDict[Math.round(scrollTop)];
			hourScrollTo(scrollDict.value);
			if (getAmOrPm(props.date) === amPm.pm) {
				props.onChangeDate(
					new Date(new Date(props.date).setHours(scrollDict.time + 12))
				);
			} else {
				props.onChangeDate(
					new Date(new Date(props.date).setHours(scrollDict.time))
				);
			}
		}
	};

	const setStateMinuteOnScrollEnd = () => {
		if (minDivRef.current) {
			const { scrollTop } = minDivRef.current;

			const scrollDict = minuteScrollDict[Math.round(scrollTop)];
			minuteScrollTo(scrollDict.value);
			props.onChangeDate(
				new Date(new Date(props.date).setMinutes(scrollDict.time))
			);
		}
	};

	const getAmOrPm = (date: Date) => {
		if (date.getHours() <= 12) {
			return amPm.am;
		} else {
			return amPm.pm;
		}
	};

	const onClickAmPm = (value: string | number) => {
		if (value === amPm.pm) {
			props.onChangeDate(
				new Date(props.date.setHours(props.date.getHours() + 12))
			);
		} else {
			props.onChangeDate(
				new Date(props.date.setHours(props.date.getHours() - 12))
			);
		}
	};

	console.log('aaa');

	return (
		<div>
			<GroupButton
				value={getAmOrPm(props.date)}
				buttonsProps={[
					{ label: 'am', value: amPm.am, onClick: onClickAmPm },
					{ label: 'pm', value: amPm.pm, onClick: onClickAmPm },
				]}
			/>
			<div className='TimeSelectorContainerDiv'>
				<div className='TimeSelectorSelectionDiv' />
				<div className='TimeSelectorOpacityDiv TimeSelectorOpacityDiv1' />
				<div className='TimeSelectorOpacityDiv TimeSelectorOpacityDiv2' />
				<div
					className='TimeSelectorGroupDiv'
					ref={hourDivRef}
					onScroll={handleScrollHour}>
					{hourArray.map((hour, i) => (
						<div
							className='TimeSelectorLabelDiv'
							key={i}>
							{hour.label}
						</div>
					))}
				</div>
				<div
					className='TimeSelectorGroupDiv'
					ref={minDivRef}
					onScroll={handleScrollMinute}>
					{minArray.map((min, i) => (
						<div
							key={i}
							className='TimeSelectorLabelDiv'>
							{min.label}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

const getTimeScrollValues = (startTime: number, endTime: number) => {
	const diff = 36;
	const minuteScrollValues: TimeScroll[] = [
		{
			min: 0,
			max: 18,
			value: 0,
			time: startTime,
		},
	];
	for (let i = 1; i < endTime; i++) {
		const valueBef = minuteScrollValues[i - 1];
		const value = valueBef.value + diff;
		minuteScrollValues.push({
			min: value - diff / 2,
			max: value + diff / 2,
			value: valueBef.value + diff,
			time: valueBef.time + 1,
		});
	}

	return minuteScrollValues;
};

const getTimeArray = (startTime: number, endTime: number) => {
	const paddingObj = { value: null, label: '' };
	const timeArray: { value: number | null; label: string }[] = [
		paddingObj,
		paddingObj,
	];

	for (let i = startTime; i <= endTime; i++) {
		timeArray.push({ value: i, label: dayHourMinuteToStrFormat(i) });
	}

	timeArray.push(paddingObj);
	timeArray.push(paddingObj);

	return timeArray;
};

export const minuteScrollValues = getTimeScrollValues(0, 60);
export const hourScrollValues = getTimeScrollValues(1, 12);
const minuteScrollDict = createTimeScrollDict(minuteScrollValues);
const hourScrollDict = createTimeScrollDict(hourScrollValues);
export const minArray = getTimeArray(0, 60);
export const hourArray = getTimeArray(1, 12);

export interface TimeScroll {
	min: number;
	max: number;
	value: number;
	time: number;
}
