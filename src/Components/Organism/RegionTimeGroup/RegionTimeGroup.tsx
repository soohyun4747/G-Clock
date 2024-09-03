import { IconButton } from 'Components/Atom/IconButton/IconButtons';
import {
	RegionTime,
	RegionTimeProps,
} from 'Components/Atom/RegionTime/RegionTime';
import { DateTimePicker } from 'Components/Molecule/DateTimePicker/DateTimePicker';
import { CloseIcon } from 'Icons/Close';
import { HomeIcon } from 'Icons/Home';
import React, { SetStateAction } from 'react';
import './RegionTimeGroup.css';

export interface RegionTimeGroupProps extends RegionTimeProps {
	// setStartDate: React.Dispatch<SetStateAction<Date>>;
	// setEndDate: React.Dispatch<SetStateAction<Date>>;
	index: number;
	onChangeStartDate: (date: Date, index: number) => void;
	onChangeEndDate: (date: Date, index: number) => void;
	onClickHome: (index: number) => void;
	onClickDelete: (index: number) => void;
}

export function RegionTimeGroup(props: RegionTimeGroupProps) {
	const onChangeStartDate = (date: Date) => {
		props.onChangeStartDate(date, props.index);
	};

    const onChangeEndDate = (date: Date) => {
		props.onChangeEndDate(date, props.index);
	};

	return (
		<div className='RegionTimeGroupContainerDiv'>
			<div className='RegionTimeGroupIconsDiv'>
				<IconButton
					icon={<HomeIcon />}
					onClick={() => props.onClickHome(props.index)}
				/>
				<IconButton
					icon={<CloseIcon />}
					onClick={() => props.onClickDelete(props.index)}
				/>
			</div>
			<RegionTime
				style={{ marginRight: 12 }}
				stateCity={props.stateCity}
				startDate={props.startDate}
				endDate={props.endDate}
			/>
			<DateTimePicker
				style={{ marginRight: 12 }}
				date={props.startDate}
				label='From'
				// setDate={props.setStartDate}
				onChangeDate={onChangeStartDate}
			/>
			<DateTimePicker
				date={props.endDate}
				label='To'
				// setDate={props.setEndDate}o
				onChangeDate={onChangeEndDate}
			/>
		</div>
	);
}
