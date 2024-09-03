import './PlaceSearcher.css';
import { State, Country } from 'country-state-city';
import { useState } from 'react';
import { WordButton } from 'Components/Atom/WordButton/WordButton';
import {
	AlertMessage,
	AlertMessageProps,
	AlertMessageSet,
} from 'Components/Atom/AlertMessage/AlertMessage';
import { getSimilarity } from 'util/String';
import Fuse from 'fuse.js';

export interface StateCity {
	country: string;
	name: string;
	code: string;
}

export interface PlaceSearcherProps {
	onAdd: (stateCity: StateCity) => void;
}

export function PlaceSearcher(props: PlaceSearcherProps) {
	const [stateOrCity, setStateOrCity] = useState<string>('');
	const [alertInfo, setAlertInfo] = useState<AlertMessageProps>();
	const [filteredStatesCitiesList, setFilteredStatesCitiesList] = useState<
		StateCity[]
	>([]);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStateOrCity(event.target.value);

		setFilteredStatesCitiesList(
			fuse
				.search(stateOrCity)
				.slice(0, 5) // Take the top 5 results
				.map((result) => result.item)
		);
	};

	const onClickAdd = () => {
		const stateOrCityInfo = statesCitiesList.find(
			(value) => value.name === stateOrCity
		);
		if (stateOrCityInfo) {
			props.onAdd(stateOrCityInfo);
		} else {
			AlertMessageSet(
				setAlertInfo,
				'There is no such city or state',
				'error'
			);
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
						list='states-cities-list'
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
			<datalist id='states-cities-list'>
				{filteredStatesCitiesList.map((stateOrCity, i) => (
					<option
						key={i}
						value={stateOrCity.name}
						label={`${stateOrCity.country}, ${stateOrCity.name}`}></option>
				))}
			</datalist>
			{alertInfo && <AlertMessage {...alertInfo} />}
		</div>
	);
}

const getStatesCitiesList = () => {
	const statesList: any[] = State.getAllStates();

	const listOfStatesAndCities: StateCity[] = [];

	statesList.forEach((state) => {
		const country = Country.getCountryByCode(state.countryCode);
		if (country) {
			listOfStatesAndCities.push({
				country: country.name,
				name: state.name,
				code: state.isoCode,
			});
		}
	});

	return listOfStatesAndCities;
};

const statesCitiesList = getStatesCitiesList();

const fuse = new Fuse(statesCitiesList, {
	includeScore: true,
	keys: ['country', 'name'],
	threshold: 0.3, // Adjust this threshold to control sensitivity
});
