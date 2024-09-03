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
	onChangeStartDate: (date: Date) => void;
	onChangeEndDate: (date: Date) => void;
	onClickHome: () => void;
	onClickDelete: () => void;
}

export function RegionTimeGroup(props: RegionTimeGroupProps) {
	return (
		<div className='RegionTimeGroupContainerDiv'>
			<div className='RegionTimeGroupIconsDiv'>
				<IconButton
					icon={<HomeIcon />}
					onClick={props.onClickHome}
				/>
				<IconButton
					icon={<CloseIcon />}
					onClick={props.onClickDelete}
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
				onChangeDate={props.onChangeStartDate}
			/>
			<DateTimePicker
				date={props.endDate}
				label='To'
				// setDate={props.setEndDate}o
				onChangeDate={props.onChangeEndDate}
			/>
		</div>
	);
}
