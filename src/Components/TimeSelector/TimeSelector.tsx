import { hourArray, minArray, timeScrollValues } from 'lib/const';
import './TimeSelector.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createTimeScrollDict, getCurrentMinInFiveMulti } from 'util/Time';

export interface TimeSelectorProps {
	minute: number;
	hour: number;
	setMinute: React.Dispatch<React.SetStateAction<number>>;
	setHour: React.Dispatch<React.SetStateAction<number>>;
}

export function TimeSelector(props: TimeSelectorProps) {
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

	const hourDivRef = useRef<HTMLDivElement>(null);
	const minDivRef = useRef<HTMLDivElement>(null);

	const timeScrollDict = useMemo(() => createTimeScrollDict(), []);

	useEffect(() => {
		setStateMinuteAndScroll();
	}, [props.minute]);

	useEffect(() => {
		setStateHourAndScroll();
	}, [props.hour]);

	const setStateMinuteAndScroll = () => {
		const scrollVal = timeScrollValues.find(
			(timeScroll) => timeScroll.time.minute === props.minute
		)?.value;
		if (scrollVal !== undefined) {
			minuteScrollTo(scrollVal);
		}
	};

	const setStateHourAndScroll = () => {
		const scrollVal = timeScrollValues.find(
			(timeScroll) => timeScroll.time.hour === props.hour
		)?.value;
		if (scrollVal !== undefined) {
			hourScrollTo(scrollVal);
		}
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

	const handleScroll = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		setTimeoutId(
			setTimeout(() => {
				setStateTimeOnScrollEnd();
			}, 200)
		);
	};

	const setStateTimeOnScrollEnd = () => {
		if (hourDivRef.current) {
			const { scrollTop } = hourDivRef.current;
			const scrollDict = timeScrollDict[scrollTop];
			hourScrollTo(scrollDict.value);
			props.setHour(scrollDict.time.hour);
		}

		if (minDivRef.current) {
			const { scrollTop } = minDivRef.current;
			const scrollDict = timeScrollDict[scrollTop];
			minuteScrollTo(scrollDict.value);
			props.setMinute(scrollDict.time.minute);
		}
	};

	return (
		<div className='TimeSelectorContainerDiv'>
			<div className='TimeSelectorSelectionDiv' />
			<div className='TimeSelectorOpacityDiv TimeSelectorOpacityDiv1' />
			<div className='TimeSelectorOpacityDiv TimeSelectorOpacityDiv2' />
			<div
				className='TimeSelectorGroupDiv'
				ref={hourDivRef}
				onScroll={handleScroll}>
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
				onScroll={handleScroll}>
				{minArray.map((min, i) => (
					<div
						key={i}
						className='TimeSelectorLabelDiv'>
						{min.label}
					</div>
				))}
			</div>
		</div>
	);
}
