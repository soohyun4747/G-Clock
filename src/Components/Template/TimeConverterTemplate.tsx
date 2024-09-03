import { TextField } from '@mui/material';
import { Dropdown } from 'Components/Atom/Dropdown/Dropdown';
import { RegionTimeProps } from 'Components/Atom/RegionTime/RegionTime';
import {
	PlaceSearcher,
	StateCity,
} from 'Components/Molecule/PlaceSearcher/PlaceSearcher';
import { Header } from 'Components/Organism/Header/Header';
import { RegionTimeGroup } from 'Components/Organism/RegionTimeGroup/RegionTimeGroup';
import { timeUnit } from 'lib/const';
import { SetStateAction, useState } from 'react';
import { dateAfter } from 'util/Time';

export function TimeConverterTemplate() {
	const [timeRange, setTimeRange] = useState<number>(30);
	const [selectedTimeUnit, setSelectedTimeUnit] = useState<string | number>(
		timeUnit.min
	);
	const [regionTimeList, setRegionTimeList] = useState<RegionTimeProps[]>([]);

	const onAddPlace = (stateCity: StateCity) => {
		setRegionTimeList((prev) => {
			if (prev.length === 0) {
				prev.push({
					stateCity: stateCity,
					startDate: new Date(),
					endDate: dateAfter(timeRange),
				});
			}

			return [...prev];
		});
	};

	const onChangeStartDate = (date: Date, index: number) => {
		setRegionTimeList((prev) => {
			prev[index].startDate = date;
			return [...prev];
		});
	};

	const onChangeEndDate = (date: Date, index: number) => {
		setRegionTimeList((prev) => {
			prev[index].endDate = date;
			return [...prev];
		});
	};

	const onClickHome = (index: number) => {
		setRegionTimeList((prev) => {
			prev[index].homeTimeDiff = undefined;
			return [...prev];
		});
	};

	const onClickDelete = (index: number) => {
		setRegionTimeList((prev) => prev.splice(index, 1));
	};

	return (
		<div>
			<Header />
			<div>
				<PlaceSearcher onAdd={onAddPlace} />
				<div>
					<div />
					<div>
						<TextField />
						<Dropdown
							options={timeUnitOptions}
							value={selectedTimeUnit}
							setValue={setSelectedTimeUnit}
						/>
					</div>
				</div>
			</div>
			<div>
				{regionTimeList.map((regionTime, i) => (
					<RegionTimeGroup
						onChangeStartDate={onChangeStartDate}
						onChangeEndDate={onChangeEndDate}
						onClickHome={onClickHome}
						onClickDelete={onClickDelete}
						stateCity={regionTime.stateCity}
						startDate={regionTime.startDate}
						endDate={regionTime.endDate}
						index={i}
					/>
				))}
			</div>
		</div>
	);
}

const timeUnitOptions = [
	{ value: timeUnit.min, label: timeUnit.min },
	{ value: timeUnit.hour, label: timeUnit.hour },
];
