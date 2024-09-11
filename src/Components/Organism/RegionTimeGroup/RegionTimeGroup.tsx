import { IconButton } from 'Components/Atom/IconButton/IconButtons';
import {
	IRegionTime,
	RegionTime,
	RegionTimeProps,
} from 'Components/Atom/RegionTime/RegionTime';
import { DateTimePicker } from 'Components/Molecule/DateTimePicker/DateTimePicker';
import { CloseIcon } from 'Icons/Close';
import { HomeIcon } from 'Icons/Home';
import React, { useEffect, useMemo } from 'react';
import './RegionTimeGroup.css';
import { calculateHourDifference, hoursToMilliseconds } from 'util/Time';

export interface RegionTimeGroupProps extends RegionTimeProps {
	style?: React.CSSProperties;
	index: number;
	regionTimeList: IRegionTime[];
	onChangeStartDate: (date: Date, index: number) => void;
	onChangeEndDate: (date: Date, index: number) => void;
	onClickHome: (props: IRegionTime) => void;
	onClickDelete: (index: number) => void;
	setRegionTimeList: React.Dispatch<React.SetStateAction<IRegionTime[]>>;
}

export function RegionTimeGroup(props: RegionTimeGroupProps) {
	const isHome = useMemo(() => {
		if (props.regionTimeHome) {
			if (props.regionTimeHome.stateCity.name === props.stateCity.name) {
				return true;
			}
		}
		return false;
	}, [props.regionTimeHome, props.stateCity]);

	const isRegionTimeListOne = useMemo(() => {
		if (props.regionTimeList.length === 1) {
			return true;
		}
		return false;
	}, [props.regionTimeList]);

	const timeHourDiff = useMemo(() => {
		if (props.regionTimeHome) {
			return calculateHourDifference(
				props.regionTimeHome.timezone,
				props.timezone
			);
		}
	}, [props.regionTimeHome]);

	useEffect(() => {
		if (props.regionTimeHome) {
			setRegionTimeWithHome(
				props.regionTimeHome,
				props.index,
				timeHourDiff
			);
		}
	}, [props.regionTimeHome, timeHourDiff]);

	const setRegionTimeWithHome = (
		regionTimeHome: RegionTimeProps,
		index: number,
		timeDiff?: number
	) => {
		if (timeDiff) {
			const millSecDiff = hoursToMilliseconds(timeDiff);
			props.setRegionTimeList((prev) => {
				prev[index].startDate = new Date(
					regionTimeHome.startDate.getTime() + millSecDiff
				);
				prev[index].endDate = new Date(
					regionTimeHome.endDate.getTime() + millSecDiff
				);

				return [...prev];
			});
		} else {
			props.setRegionTimeList((prev) => {
				prev[index].startDate = new Date(
					regionTimeHome.startDate.getTime()
				);
				prev[index].endDate = new Date(
					regionTimeHome.endDate.getTime()
				);

				return [...prev];
			});
		}
	};

	const onChangeStartDate = (date: Date) => {
		props.onChangeStartDate(date, props.index);
	};

	const onChangeEndDate = (date: Date) => {
		props.onChangeEndDate(date, props.index);
	};

	return (
		<div
			className='RegionTimeGroupContainerDiv'
			style={props.style}>
			<div className='RegionTimeGroupGridItem1'>
				<div className='RegionTimeGroupIconsDiv'>
					<IconButton
						icon={<HomeIcon />}
						onClick={() => props.onClickHome(props)}
						style={{ opacity: isHome ? 0.3 : 1 }}
						disabled={isHome ? true : false}
					/>
					<IconButton
						icon={<CloseIcon />}
						onClick={() => props.onClickDelete(props.index)}
						style={{
							opacity: isRegionTimeListOne ? 0.3 : 1,
						}}
						disabled={isRegionTimeListOne ? true : false}
					/>
				</div>
				<RegionTime
					style={{ width: '100%' }}
					stateCity={props.stateCity}
					startDate={props.startDate}
					endDate={props.endDate}
					regionTimeHome={props.regionTimeHome}
					timezone={props.timezone}
					homeTimeDiff={timeHourDiff}
				/>
			</div>
			<div className='RegionTimeGroupGridItem2'>
				<DateTimePicker
					date={props.startDate}
					label='From'
					onChangeDate={onChangeStartDate}
					style={{width: 'auto'}}
				/>
			</div>
			<div className='RegionTimeGroupGridItem3'>
				<DateTimePicker
					date={props.endDate}
					label='To'
					onChangeDate={onChangeEndDate}
					style={{width: 'auto'}}
				/>
			</div>
		</div>
	);
}
