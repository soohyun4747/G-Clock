import { Dropdown } from 'Components/Atom/Dropdown/Dropdown';
import { IRegionTime } from 'Components/Atom/RegionTime/RegionTime';
import {
	PlaceSearcher,
	StateCity,
} from 'Components/Molecule/PlaceSearcher/PlaceSearcher';
import { Header } from 'Components/Organism/Header/Header';
import { RegionTimeGroup } from 'Components/Organism/RegionTimeGroup/RegionTimeGroup';
import {
	SeoulInfo,
	SeoulTimezone,
	dayToMsec,
	hourToMsec,
	minuteToMsec,
	timeUnit,
} from 'lib/const';
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
	AlertMessageSet,
} from 'Components/Atom/AlertMessage/AlertMessage';
import { ProgressCircle } from 'Components/Atom/ProgressCircle/ProgressCircle';
import { TimeInterval } from 'Components/Molecule/TimeInterval/TimeInterval';

export function TimeConverterTemplate() {
	const [timeRange, setTimeRange] = useState<number>(30);
	const [timeRangeInput, setTimeRangeInput] = useState<string | number>(30);
	const [selectedTimeUnit, setSelectedTimeUnit] = useState<string | number>(
		timeUnit.min
	);
	const [regionTimeHome, setRegionTimeHome] = useState<IRegionTime>();
	const [regionTimeList, setRegionTimeList] = useState<IRegionTime[]>([]);
	const [alertInfo, setAlertInfo] = useState<AlertMessageProps>();
	const [isProgress, setIsProgress] = useState<boolean>(false);

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
		const [, cityState] = timezone.split('/');
		const cityStateName = cityState.split('_').join(' ');
		return cityStateName;
	};

	const onAddPlace = async (stateCity: StateCity) => {
		if (
			regionTimeHome &&
			stateCity.latitude !== undefined &&
			stateCity.longitude !== undefined
		) {
			setIsProgress(true);
			getTimeZoneFromCoordinates(stateCity.latitude, stateCity.longitude)
				.then((response) => {
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
					setIsProgress(false);
				})
				.catch((error) => {
					setIsProgress(false);
					console.log({ error });
					AlertMessageSet(
						setAlertInfo,
						'Failed to add the region',
						'error'
					);
				});
		}
	};

	const setStateRegionTimeHome = (dateType: DateType, timeDiff: number) => {
		setRegionTimeHome((prev) => {
			if (prev) {
				prev[dateType] = new Date(prev[dateType].getTime() + timeDiff);
				return { ...prev };
			}
		});
	};

	const setStateTimeRangeWithPrevTimeDiff = (timeDiff: number) => {
		setTimeRange((prev) => {
			const newTimeRange = prev + timeRangeByUnit(timeDiff);
			setTimeRangeInput(Math.round(newTimeRange));
			return newTimeRange;
		});
	};

	const timeRangeByUnit = (timeMSec: number) => {
		switch (selectedTimeUnit) {
			case timeUnit.min:
				return timeMSec / minuteToMsec;
			case timeUnit.hour:
				return timeMSec / hourToMsec;
			case timeUnit.day:
				return timeMSec / dayToMsec;
			default:
				return timeMSec / minuteToMsec;
		}
	};

	const onChangeStartDate = (date: Date, index: number) => {
		const newStartDateTime = date.getTime();
		const endDateTime = regionTimeList[index][dateType.endDate].getTime();

		const changedTimeDiff =
			date.getTime() -
			regionTimeList[index][dateType.startDate].getTime();
		setStateRegionTimeHome(dateType.startDate, changedTimeDiff);

		if (endDateTime <= newStartDateTime) {
			setStateRegionTimeHome(dateType.endDate, changedTimeDiff);
		} else {
			setStateTimeRangeWithPrevTimeDiff(-changedTimeDiff);
		}
	};

	const onChangeEndDate = (date: Date, index: number) => {
		const newEndDateTime = date.getTime();
		const startDateTime =
			regionTimeList[index][dateType.startDate].getTime();

		const changedTimeDiff =
			date.getTime() - regionTimeList[index][dateType.endDate].getTime();
		setStateRegionTimeHome(dateType.endDate, changedTimeDiff);

		if (newEndDateTime <= startDateTime) {
			// AlertMessageSet(
			// 	setAlertInfo,
			// 	'Ending date should be larger than starting date',
			// 	'error'
			// );
			setStateRegionTimeHome(dateType.startDate, changedTimeDiff);
		} else {
			setStateTimeRangeWithPrevTimeDiff(changedTimeDiff);
			// setStateRegionTimeHome(dateType.endDate, changedTimeDiff);
		}
	};

	const onClickHome = (props: IRegionTime) => {
		setRegionTimeHome(props);
	};

	const onClickDelete = (index: number) => {
		setRegionTimeList((prev) => {
			//if deleting home region and there is only one
			if (
				prev[index].stateCity.name === regionTimeHome?.stateCity.name &&
				prev.filter(
					(item) =>
						item.stateCity.name === regionTimeHome?.stateCity.name
				).length === 1
			) {
				prev.splice(index, 1);
				setRegionTimeHome(prev[0]);
			} else {
				prev.splice(index, 1);
			}
			return [...prev];
		});
	};

	const onBlurTimeRange = (event: React.FocusEvent<HTMLInputElement>) => {
		const numVal = Number(event.target.value);

		if (isNaN(numVal)) {
			setTimeRangeInput(timeRange);
		} else {
			const timeRangeMsec = getTimeRangeMsec(numVal, selectedTimeUnit);
			setRegionTimeHomeWithTimeDiff(timeRangeMsec);
			setTimeRange(numVal);
		}
	};

	const setRegionTimeHomeWithTimeDiff = (timeRangeMsec: number) => {
		if (regionTimeHome) {
			const changedEndTimeDiff =
				regionTimeHome.startDate.getTime() +
				timeRangeMsec -
				regionTimeHome.endDate.getTime();

			setStateRegionTimeHome('endDate', changedEndTimeDiff);
		}
	};

	const getTimeRangeMsec = (value: number, unit: string | number) => {
		let unitMsec = 1;
		switch (unit) {
			case timeUnit.min:
				unitMsec = minuteToMsec * value;
				break;
			case timeUnit.hour:
				unitMsec = hourToMsec * value;
				break;
			case timeUnit.day:
				unitMsec = dayToMsec * value;
				break;
		}

		return unitMsec;
	};

	// const onChangeTimeUnit = (event: React.ChangeEvent<HTMLSelectElement>) => {
	// 	const timeRangeMsec = getTimeRangeMsec(timeRange, event.target.value);
	// 	setRegionTimeHomeWithTimeDiff(timeRangeMsec);
	// 	setSelectedTimeUnit(event.target.value);
	// };

	const onChangeTimeRange = (timeDiff: number) => {
		setRegionTimeHomeWithTimeDiff(timeDiff);
	};

	return (
		<div>
			<Header setAlertInfo={setAlertInfo} />
			<div className='TimeConverterBodyFooterDiv'>
				<div className='TimeConverterTemplateBodyDiv'>
					{/* <div className='TimeConverterTemplateTimeRangeGroupDiv2'>
						<div className='TimeConverterTemplateTimeRangeLabelDiv'>
							Time Interval
						</div>
						<div className='TimeConverterTemplateTimeRangeDiv'>
							<Textfield
								style={{
									width: 67,
									marginRight: 9,
									height: 36,
								}}
								inputAttributes={{
									style: { textAlign: 'center' },
									'aria-label': 'time interval',
								}}
								value={timeRangeInput}
								setValue={setTimeRangeInput}
								onBlur={onBlurTimeRange}
							/>
							<Dropdown
								options={timeUnitOptions}
								value={selectedTimeUnit}
								onChange={onChangeTimeUnit}
								style={{ height: 36 }}
								selectAttributes={{ 'aria-label': 'time unit' }}
							/>
						</div>
					</div> */}
					<div className='TimeConverterTemplatePlaceTimeDiv'>
						<PlaceSearcher
							onAdd={onAddPlace}
							setAlertInfo={setAlertInfo}
							style={{ flex: 1, width: '100%' }}
						/>
						<div className='TimeConverterTemplateTimeRangeGroupDiv'>
							<div className='TimeConverterTemplateLeftRangeDiv' />
							{/* <div className='TimeConverterTemplateTimeRangeDiv'>
								<Textfield
									style={{ width: 67, marginRight: 9 }}
									inputAttributes={{
										style: { textAlign: 'center' },
									}}
									value={timeRangeInput}
									setValue={setTimeRangeInput}
									onBlur={onBlurTimeRange}
								/>
								<Dropdown
									options={timeUnitOptions}
									value={selectedTimeUnit}
									onChange={onChangeTimeUnit}
								/>
							</div> */}
							{regionTimeHome && (
								<TimeInterval
									timeInterval={
										regionTimeHome.endDate.getTime() -
										regionTimeHome.startDate.getTime()
									}
									onChangeTimeRange={onChangeTimeRange}
								/>
							)}
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
								regionTimeList={regionTimeList}
							/>
						))}
					</div>
					{/* <div className='TimeConverterTemplateAdvDiv'>
						<img
							className='TimeConverterTemplateImg'
							src='/ads.png'
							alt='a flight with different countries'
						/>
					</div> */}
					<div className='TimeConverterTemplateDetailsGroupDiv'>
						<div className='TimeConverterTemplateDetailDiv'>
							<h1 className='TimeConverterTemplateH'>
								World Time Zone Converter: Easily Convert Time
								Between Countries
							</h1>
							Welcome to Global Time Converter, your best tool for
							converting times between any cities around the
							world. Instantly find out what time and date it is
							in any city when it's a specific time and date in
							another city. For example, discover what time and
							date it is in Seoul when it's 3pm on this Friday in
							Toronto. Our user-friendly interface ensures quick
							and accurate results, making it easy to plan
							meetings and calls by checking the different time
							zones.
						</div>
						<div className='TimeConverterTemplateDetailDiv'>
							<h3 className='TimeConverterTemplateH'>
								Why you need our global time zone converter
							</h3>
							At our Global Time Converter, you can easily
							checkout the exact future time in different
							countries and regions. Whether you need to know the
							time difference between New York and Sydney, Paris
							and Beijing, or any other cities, our tool delivers
							precise and dependable results. Our tool is designed
							for travelers, remote workers, and international
							teams. Access our services from any device,
							anywhere.
						</div>
						<div className='TimeConverterTemplateDetailDiv'>
							<h2 className='TimeConverterTemplateH'>
								How to use our global time converter
							</h2>
							<div className='TimeConverterTemplateProgressDiv'>
								1. Add a location or timezone
							</div>
							<div className='TimeConverterTemplateProgressDiv'>
								2. Adjust time for a location that is added and
								check the time of other locations as well
							</div>
							<div className='TimeConverterTemplateProgressDiv'>
								3. Easily adjust the times for locations using
								the time interval
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
			{alertInfo && <AlertMessage {...alertInfo} />}
			{isProgress && <ProgressCircle />}
		</div>
	);
}

const timeUnitOptions = [
	{ value: timeUnit.min, label: timeUnit.min },
	{ value: timeUnit.hour, label: timeUnit.hour },
	{ value: timeUnit.day, label: timeUnit.day },
];

const dateType = {
	startDate: 'startDate',
	endDate: 'endDate',
} as const;

type DateType = (typeof dateType)[keyof typeof dateType];
