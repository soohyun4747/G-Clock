import { amPm, hourArray, minArray, timeScrollValues } from 'lib/const';
import './TimeSelector.css';
import { SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { createTimeScrollDict, getDateMinuteInFiveMulti } from 'util/Time';
import { GroupButton } from 'Components/Atom/GroupButton/GroupButton';
import { DateTimePickerProps } from 'Components/Molecule/DateTimePicker/DateTimePicker';

export interface TimeSelectorProps {
	date: Date;
	// setDate: React.Dispatch<SetStateAction<Date>>;
	onChangeDate: (date: Date) => void;
}

export function TimeSelector(props: TimeSelectorProps) {
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

	const hourDivRef = useRef<HTMLDivElement>(null);
	const minDivRef = useRef<HTMLDivElement>(null);

	const timeScrollDict = useMemo(() => createTimeScrollDict(), []);

	useEffect(() => {
		setStateHourAndScroll(props.date);
		setStateMinuteAndScroll(props.date);
	}, [props.date]);

	const setStateMinuteAndScroll = (date: Date) => {
		const dateMinutesInFiveMulti = getDateMinuteInFiveMulti(date);

		const scrollVal = timeScrollValues.find(
			(timeScroll) => timeScroll.time.minute === dateMinutesInFiveMulti
		)?.value;

		if (scrollVal !== undefined) {
			minuteScrollTo(scrollVal);

			if (props.date.getMinutes() !== dateMinutesInFiveMulti) {
				props.onChangeDate(
					new Date(date.setMinutes(dateMinutesInFiveMulti))
				);
			}
		}

		//when minute is 58-59
		else {
			minuteScrollTo(0);
			const newDate = new Date(date.setMinutes(0));
			props.onChangeDate(
				new Date(newDate.setHours(newDate.getHours() + 1))
			);
		}
	};

	const setStateHourAndScroll = (date: Date) => {
		const dateHours = getDateHours(date);
		const scrollVal = timeScrollValues.find(
			(timeScroll) => timeScroll.time.hour === dateHours
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
			// props.setDate((prev) => {
			// 	if (getAmOrPm(prev) === amPm.pm) {
			// 		return new Date(prev.setHours(scrollDict.time.hour + 12));
			// 	}
			// 	return new Date(prev.setHours(scrollDict.time.hour));
			// });
			if (getAmOrPm(props.date) === amPm.pm) {
				props.onChangeDate(
					new Date(props.date.setHours(scrollDict.time.hour + 12))
				);
			}
			props.onChangeDate(
				new Date(props.date.setHours(scrollDict.time.hour))
			);
		}

		if (minDivRef.current) {
			const { scrollTop } = minDivRef.current;
			const scrollDict = timeScrollDict[scrollTop];
			minuteScrollTo(scrollDict.value);
			// props.setDate(
			// 	(prev) => new Date(prev.setMinutes(scrollDict.time.minute))
			// );
			props.onChangeDate(
				new Date(props.date.setMinutes(scrollDict.time.minute))
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
			// props.setDate(
			// 	(prev) => new Date(prev.setHours(prev.getHours() + 12))
			// );
			props.onChangeDate(new Date(props.date.setHours(props.date.getHours() + 12)))
		} else {
			// props.setDate(
			// 	(prev) => new Date(prev.setHours(prev.getHours() - 12))
			// );
			props.onChangeDate(new Date(props.date.setHours(props.date.getHours()  - 12)))
		}
	};

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
		</div>
	);
}
