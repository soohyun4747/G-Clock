import { LeftArrow } from 'Icons/LeftArrow';
import { RightArrow } from 'Icons/RightArrow';
import './Calendar.css';
import { IconButton } from 'Components/IconButton/IconButtons';
import { SetStateAction, useEffect, useState } from 'react';
import { getDatesInMonth } from 'util/Calendar';
import { months } from 'lib/const';
import { DateTimePickerProps } from 'Components/DateTimePicker/DateTimePicker';

interface YearMonth {
	year: number;
	month: number;
}

export interface CalendarProps {
	date: Date;
	setDate: React.Dispatch<SetStateAction<Date>>;
}

export function Calendar(props: CalendarProps) {
	// const [date, setDate] = useState<Date>(new Date());
	const [yearMonth, setYearMonth] = useState<YearMonth>({
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
	});
	const [datesArray, setDatesArray] = useState<Date[][]>(
		getDatesInMonth(yearMonth.year, yearMonth.month)
	);

	useEffect(() => {
		setDateWithProps();
	}, [props.date]);

	useEffect(() => {
		setDatesArray(getDatesInMonth(yearMonth.year, yearMonth.month));
	}, [yearMonth]);

	const setDateWithProps = () => {
		if (props.date) {
			// setDate(props.date);
			setYearMonth({
				year: props.date.getFullYear(),
				month: props.date.getMonth(),
			});
			setDatesArray(
				getDatesInMonth(props.date.getFullYear(), props.date.getMonth())
			);
		}
	};

	const onClickDate = (currentDate: Date) => {
		props.setDate((prev) => {
			let newDate = new Date(prev.setFullYear(currentDate.getFullYear()));
			newDate = new Date(prev.setMonth(currentDate.getMonth()));
			newDate = new Date(prev.setDate(currentDate.getDate()));

			return newDate;
		});
	};

	const onClickMonthBefore = () => {
		setYearMonth((prev) => {
			if (prev.month === 0) {
				return { year: prev.year - 1, month: 11 };
			} else {
				return { year: prev.year, month: prev.month - 1 };
			}
		});
	};

	const onClickMonthAfter = () => {
		setYearMonth((prev) => {
			if (prev.month === 11) {
				return { year: prev.year + 1, month: 0 };
			} else {
				return { year: prev.year, month: prev.month + 1 };
			}
		});
	};

	return (
		<div className='CalendarContainerDiv'>
			<div className='CalendarUpperDiv'>
				<div>
					<span className='CalendarMonthSpan'>
						{months[yearMonth.month]}
					</span>
					<span className='CalendarYearSpan'>{yearMonth.year}</span>
				</div>
				<div className='CalendarArrowDiv'>
					<IconButton
						icon={<LeftArrow />}
						onClick={onClickMonthBefore}
					/>
					<IconButton
						icon={<RightArrow />}
						onClick={onClickMonthAfter}
					/>
				</div>
			</div>
			<div>
				<div className='CalendarWeekParentDiv'>
					<span className='CalendarWeekSpan'>S</span>
					<span className='CalendarWeekSpan'>M</span>
					<span className='CalendarWeekSpan'>T</span>
					<span className='CalendarWeekSpan'>W</span>
					<span className='CalendarWeekSpan'>T</span>
					<span className='CalendarWeekSpan'>F</span>
					<span className='CalendarWeekSpan'>S</span>
				</div>
				{datesArray.map((dates, i) => (
					<div
						className='CalendarWeekParentDiv'
						key={i}>
						{dates.map((d, j) => {
							if (d.getMonth() === yearMonth.month) {
								if (
									d.getMonth() === props.date.getMonth() &&
									d.getDate() === props.date.getDate()
								) {
									return (
										<span
											key={j}
											className='CalendarDaySpan CalendarDaySelectedSpan'
											onClick={() => onClickDate(d)}>
											{d.getDate()}
										</span>
									);
								} else {
									return (
										<span
											key={j}
											className='CalendarDaySpan'
											onClick={() => onClickDate(d)}>
											{d.getDate()}
										</span>
									);
								}
							} else {
								return (
									<span
										key={j}
										className='CalendarDaySpan CalendarDaySpanDis'>
										{d.getDate()}
									</span>
								);
							}
						})}
					</div>
				))}
			</div>
		</div>
	);
}
