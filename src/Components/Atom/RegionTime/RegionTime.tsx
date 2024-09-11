import { HomeIcon } from 'Icons/Home';
import './RegionTime.css';
import { StateCity } from 'Components/Molecule/PlaceSearcher/PlaceSearcher';
import { dayHourMinuteToStrFormat } from 'util/Time';
import { amPm } from 'lib/const';
import { useEffect, useMemo } from 'react';

export interface IRegionTime {
	stateCity: StateCity;
	// regionTimeHome?: RegionTimeProps;
	startDate: Date;
	endDate: Date;
	timezone: string;
}

export interface RegionTimeProps extends IRegionTime {
	style?: React.CSSProperties;
	homeTimeDiff?: number;
	regionTimeHome?: RegionTimeProps;
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
			return {
				hour: dayHourMinuteToStrFormat(value),
				amPm: amPm.am,
			};
		} else {
			return {
				hour: dayHourMinuteToStrFormat(value - 12),
				amPm: amPm.pm,
			};
		}
	};

	return (
		<div
			className='RegionTimeContainerDiv'
			style={props.style}>
			<div className='RegionTimeStateCountryDiv'>
				<div className='RegionTimeStateGroupDiv'>
					<div className='RegionTimeStateDiv'>
						{props.stateCity.name}
					</div>
					{props.homeTimeDiff !== undefined && (
						<div className='RegionTimeDiffHomeDiv'>
							{props.regionTimeHome!.stateCity.name ===
							props.stateCity.name ? (
								<HomeIcon />
							) : (
								<div className='RegionTimeDiffDiv'>
									{getHomeTimeDiffStr(props.homeTimeDiff)}
								</div>
							)}
						</div>
					)}
				</div>
				<div className='RegionTimeCountryDateDiv'>
					{props.stateCity.country}
				</div>
			</div>
			{/* <div>
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
			</div> */}
		</div>
	);
}
