import { HomeIcon } from 'Icons/Home';
import './RegionTime.css';
import { StateCity } from 'Components/Molecule/PlaceSearcher/PlaceSearcher';
import { dayHourMinuteToStrFormat } from 'util/Time';
import { amPm } from 'lib/const';

export interface RegionTimeProps {
	style?: React.CSSProperties;
	stateCity: StateCity;
	homeTimeDiff?: number;
	startDate: Date;
	endDate: Date;
}

export function RegionTime(props: RegionTimeProps) {
	const getHomeTimeDiffStr = (diff: number) => {
		if (0 <= diff) {
			return `+${diff}`;
		}
		return diff.toString();
	};

	const getDateTimeStr = (date: Date) => {
		const hours = getHourStrAmPm(date.getHours());
		const minutes = dayHourMinuteToStrFormat(date.getMinutes());

		return `${hours.hour} : ${minutes} ${hours.amPm}`;
	};

	const getHourStrAmPm = (value: number) => {
		if (value <= 12) {
			const hourStr = dayHourMinuteToStrFormat(value);
			return {
				hour: hourStr,
				amPm: amPm.am,
			};
		} else {
			return {
				hour: value.toString(),
				amPm: amPm.pm,
			};
		}
	};

	const getDateStr = (date: Date) => {
		console.log({date});
		
		const [dayOfWeek, month, day] = date.toDateString().split(' ');

		console.log({dayOfWeek, month, day});
		

		return `${dayOfWeek}, ${month} ${day}`;
	};

	console.log(props.endDate);
	

	return (
		<div
			className='RegionTimeContainerDiv'
			style={props.style}>
			<div className='RegionTimeStateCountryDiv'>
				<div className='RegionTimeStateGroupDiv'>
					<div className='RegionTimeStateDiv'>
						{props.stateCity.name}
					</div>
					<div className='RegionTimeDiffHomeDiv'>
						{props.homeTimeDiff !== undefined ? (
							<div className='RegionTimeDiffDiv'>
								{getHomeTimeDiffStr(props.homeTimeDiff)}
							</div>
						) : (
							<HomeIcon />
						)}
					</div>
				</div>
				<div className='RegionTimeCountryDateDiv'>
					{props.stateCity.country}
				</div>
			</div>
			<div>
				<div className='RegionTimeTimeDiv'>
					{getDateTimeStr(props.startDate)}
				</div>
				<div className='RegionTimeCountryDateDiv'>
					{getDateStr(props.startDate)}
				</div>
			</div>
			<div className='RegionTimeLineDiv'>-</div>
			<div>
				<div className='RegionTimeTimeDiv'>
					{getDateTimeStr(props.endDate)}
				</div>
				<div className='RegionTimeCountryDateDiv'>
					{getDateStr(props.endDate)}
				</div>
			</div>
		</div>
	);
}
