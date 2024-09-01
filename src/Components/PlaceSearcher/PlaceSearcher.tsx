import { Alert } from '@mui/material';
import './PlaceSearcher.css';
import { ICity, IState, State, City, Country } from 'country-state-city';
import { useEffect, useState } from 'react';
import { WordButton } from 'Components/WordButton/WordButton';

export interface StateCity extends IState, ICity {
	country: string;
}

export interface PlaceSearcherProps {
	onAdd: (stateCity: StateCity) => void;
}

export function PlaceSearcher(props: PlaceSearcherProps) {
	const [statesCitiesList, setStatesCitiesList] = useState<StateCity[]>([]);
	const [stateOrCity, setStateOrCity] = useState<string>('');
	const [alertVisibility, setAlertVisibility] = useState<boolean>(false);

	useEffect(() => {
		setStatesCitiesList(getStatesCitiesList());
	}, []);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStateOrCity(event.target.value);
	};

	const onClickAdd = () => {
		const stateOrCityInfo = statesCitiesList.find(
			(value) => value.name === stateOrCity
		);
		if (stateOrCityInfo) {
			props.onAdd(stateOrCityInfo);
		} else {
			setAlertVisibility(true);
			setTimeout(() => setAlertVisibility(false), 2000);
		}
	};

	return (
		<div>
			<div className='PlaceSearcherContainerDiv'>
				<div className='PlaceSearcherInputDiv'>
					<input
						type='text'
						placeholder='search place'
						className='PlaceSearcherInput'
						list='dataList'
						onChange={onChangeInput}
						value={stateOrCity}
					/>
				</div>
				<WordButton
					label='Add'
					style={{ height: 36, marginLeft: 6, width: 60, padding: 0 }}
					onClick={onClickAdd}
				/>
			</div>
			<datalist
				id='dataList'
				className='PlaceSearcherDataList'>
				{statesCitiesList.map((stateOrCity, i) => (
					<option
						key={i}
						value={stateOrCity.name}
						label={`${stateOrCity.country}, ${stateOrCity.name}`}
					/>
				))}
			</datalist>
			{alertVisibility && (
				<Alert severity={'error'}>There is no such state or city</Alert>
			)}
		</div>
	);
}

const getStatesCitiesList = () => {
	const statesList: any[] = State.getAllStates();
	// const citiesList: any[] = City.getAllCities();

	const listOfStatesAndCities: StateCity[] = [];

	statesList.forEach((state) => {
		const country = Country.getCountryByCode(state.countryCode);
		if (country) {
			state.country = country.name;
			listOfStatesAndCities.push(state);
		}
	});

	// citiesList.forEach((city) => {
	// 	const country = Country.getCountryByCode(city.countryCode);
	// 	if (country) {
	// 		city.country = country.name;
	// 		listOfStatesAndCities.push(city);
	// 	}
	// });

	return listOfStatesAndCities;
};
