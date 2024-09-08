import { Dropdown } from 'Components/Atom/Dropdown/Dropdown';
import {
	IRegionTime,
	RegionTimeProps,
} from 'Components/Atom/RegionTime/RegionTime';
import {
	PlaceSearcher,
	StateCity,
} from 'Components/Molecule/PlaceSearcher/PlaceSearcher';
import { Header } from 'Components/Organism/Header/Header';
import { RegionTimeGroup } from 'Components/Organism/RegionTimeGroup/RegionTimeGroup';
import { SeoulInfo, SeoulTimezone, timeUnit } from 'lib/const';
import { SetStateAction, useEffect, useState } from 'react';
import { convertTimeZone, dateAfter } from 'util/Time';
import './TimeConverterTemplate.css';
import { Textfield } from 'Components/Atom/Textfield/Textfield';
import { Footer } from 'Components/Organism/Footer/Footer';
import {
	IPResponse,
	getLocation,
	getTimeZoneFromCoordinates,
} from 'util/Location';
import moment from 'moment-timezone';
import {
	AlertMessage,
	AlertMessageProps,
} from 'Components/Atom/AlertMessage/AlertMessage';

// export interface IRegionTime extends Omit<RegionTimeProps, 'regionTimeHome'> {}

export function TimeConverterTemplate() {
	const [timeRange, setTimeRange] = useState<number>(30);
	const [timeRangeInput, setTimeRangeInput] = useState<string>('30');
	const [selectedTimeUnit, setSelectedTimeUnit] = useState<string | number>(
		timeUnit.min
	);
	const [regionTimeHome, setRegionTimeHome] = useState<IRegionTime>();
	const [regionTimeList, setRegionTimeList] = useState<IRegionTime[]>([]);
	const [alertInfo, setAlertInfo] = useState<AlertMessageProps>();

	useEffect(() => {
		setStateInitRegionTime();
	}, []);

	const setStateInitRegionTime = () => {
		const location = getLocation();
		location
			.then((response) => {
				const data: IPResponse = response.data;
				const regionTime = {
					stateCity: {
						country: data.country,
						name: getCityStateNameFromTimezone(data.timezone),
						latitude: data.lat,
						longitude: data.lon,
					},
					startDate: new Date(),
					endDate: dateAfter(timeRange, data.timezone),
					timezone: data.timezone,
				};
				setRegionTimeList([regionTime]);
				setRegionTimeHome(regionTime);
			})
			.catch((error) => {
				const regionTime = {
					stateCity: SeoulInfo,
					startDate: moment.tz(new Date(), SeoulTimezone).toDate(),
					endDate: dateAfter(timeRange, SeoulTimezone),
					timezone: SeoulTimezone,
				};
				setRegionTimeList([regionTime]);
				setRegionTimeHome(regionTime);
			});
	};

	const getCityStateNameFromTimezone = (timezone: string) => {
		const [continent, cityState] = timezone.split('/');
		const cityStateName = cityState.split('_').join(' ');
		return cityStateName;
	};

	const onAddPlace = async (stateCity: StateCity) => {
		if (
			regionTimeHome &&
			stateCity.latitude !== undefined &&
			stateCity.longitude !== undefined
		) {
			getTimeZoneFromCoordinates(
				stateCity.latitude,
				stateCity.longitude
			).then((response) => {
				const data = response.data.results[0];

				const timezone = data.timezone.name;

				setRegionTimeList((prev) => {
					prev.push({
						stateCity: stateCity,
						startDate: convertTimeZone(
							regionTimeHome.timezone,
							timezone,
							regionTimeHome.startDate
						),
						endDate: convertTimeZone(
							regionTimeHome.timezone,
							timezone,
							regionTimeHome.endDate
						),
						timezone: timezone,
					});

					return [...prev];
				});
			});
		}
	};

	const onChangeDate = (
		date: Date,
		index: number,
		dateType: 'startDate' | 'endDate'
	) => {
		const changedTimeDiff =
			date.getTime() - regionTimeList[index][dateType].getTime();

		setRegionTimeHome((prev) => {
			if (prev) {
				prev[dateType] = new Date(
					prev[dateType].getTime() + changedTimeDiff
				);
				return { ...prev };
			}
		});
	};

	const onChangeStartDate = (date: Date, index: number) => {
		onChangeDate(date, index, 'startDate');
	};

	const onChangeEndDate = (date: Date, index: number) => {
		onChangeDate(date, index, 'endDate');
	};

	const onClickHome = (props: IRegionTime) => {
		setRegionTimeHome(props);
	};

	const onClickDelete = (index: number) => {
		setRegionTimeList((prev) => {
			prev.splice(index, 1);
			return [...prev];
		});
	};

	return (
		<div>
			<Header
				setAlertInfo={setAlertInfo}
			/>
			<div className='TimeConverterBodyFooterDiv'>
				<div className='TimeConverterTemplateBodyDiv'>
					<div className='TimeConverterTemplatePlaceTimeDiv'>
						<PlaceSearcher
							onAdd={onAddPlace}
							setAlertInfo={setAlertInfo}
							style={{ flex: 1, width: '100%' }}
						/>
						<div className='TimeConverterTemplateTimeRangeGroupDiv'>
							<div className='TimeConverterTemplateLeftRangeDiv' />
							<div className='TimeConverterTemplateTimeRangeDiv'>
								<Textfield
									style={{ width: 67, marginRight: 9 }}
									inputStyle={{ textAlign: 'center' }}
									value={timeRangeInput}
									setValue={setTimeRangeInput}
								/>
								<Dropdown
									options={timeUnitOptions}
									value={selectedTimeUnit}
									setValue={setSelectedTimeUnit}
								/>
							</div>
							<div className='TimeConverterTemplateRightRangeDiv' />
						</div>
					</div>
					<div className='TimeConverterTemplateRegionTimeDiv'>
						{regionTimeList.map((regionTime, i) => (
							<RegionTimeGroup
								key={i}
								onChangeStartDate={onChangeStartDate}
								onChangeEndDate={onChangeEndDate}
								onClickHome={onClickHome}
								onClickDelete={onClickDelete}
								stateCity={regionTime.stateCity}
								startDate={regionTime.startDate}
								endDate={regionTime.endDate}
								index={i}
								style={{ marginBottom: 12 }}
								regionTimeHome={regionTimeHome}
								timezone={regionTime.timezone}
								setRegionTimeList={setRegionTimeList}
							/>
						))}
					</div>
					<div className='TimeConverterTemplateAdvDiv'></div>
					<div className='TimeConverterTemplateDetailsGroupDiv'>
						<div className='TimeConverterTemplateDetailDiv'>
							Welcome to G-Time Converter, your ultimate tool for
							converting times between any cities around the
							world. Instantly find out what time it is in any
							city when it's a specific time in another city. For
							example, discover what time it is in Seoul when it's
							3pm in Toronto, or see the time in Tokyo when it's
							8am in London. Our user-friendly interface ensures
							quick and accurate results, making it easy to plan
							meetings, calls, and travel across different time
							zones.
						</div>
						<div className='TimeConverterTemplateDetailDiv'>
							At G-Time Converter, accuracy and reliability are
							our priorities. We provide real-time updates and
							data from trusted global sources, ensuring you
							always have the correct information at your
							fingertips. Our advanced algorithm handles Daylight
							Saving Time adjustments and other time zone
							differences automatically. Whether you need to know
							the time difference between New York and Sydney,
							Paris and Beijing, or any other cities, our tool
							delivers precise and dependable results.
						</div>
						<div className='TimeConverterTemplateDetailDiv'>
							Our tool is designed for travelers, remote workers,
							and international teams. Access our services from
							any device, anywhere, and take advantage of features
							like custom time zone lists, meeting planner tools,
							and interactive world maps. Join thousands of
							satisfied users who rely on World Time Converter to
							stay synchronized across the globe. Try our seamless
							and efficient time conversion tool today, and never
							miss a beat no matter where you are.
						</div>
					</div>
				</div>
				<Footer />
			</div>
			{alertInfo && <AlertMessage {...alertInfo} />}
		</div>
	);
}

const timeUnitOptions = [
	{ value: timeUnit.min, label: timeUnit.min },
	{ value: timeUnit.hour, label: timeUnit.hour },
];
