import './PlaceSearcher.css';
import { State, Country, IState } from 'country-state-city';
import { SetStateAction, useState } from 'react';
import { WordButton } from 'Components/Atom/WordButton/WordButton';
import {
	AlertMessageProps,
	AlertMessageSet,
} from 'Components/Atom/AlertMessage/AlertMessage';
import Fuse from 'fuse.js';
import { enterKeyCode } from 'util/Component';
import { removeSpacesAndSigns } from 'util/String';

export interface StateCity {
	country: string;
	name: string;
	latitude: number | undefined;
	longitude: number | undefined;
}

export interface PlaceSearcherProps {
	style?: React.CSSProperties;
	onAdd: (stateCity: StateCity) => void;
	setAlertInfo: React.Dispatch<SetStateAction<AlertMessageProps | undefined>>;
}

export function PlaceSearcher(props: PlaceSearcherProps) {
	const [stateOrCity, setStateOrCity] = useState<string>('');
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
			(value) =>
				stringToOnlyLetters(value.name) ===
				stringToOnlyLetters(stateOrCity)
		);
		if (stateOrCityInfo) {
			props.onAdd(stateOrCityInfo);
		} else {
			AlertMessageSet(
				props.setAlertInfo,
				'There is no such city or state',
				'error'
			);
		}
	};

	const stringToOnlyLetters = (value: string) => {
		return removeSpacesAndSigns(value).toLowerCase();
	};

	const onEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.code === enterKeyCode) {
			onClickAdd();
		}
	};

	return (
		<div
			className='PlaceSearcherContainerDiv'
			style={props.style}>
			<div className='PlaceSearcherInputDiv'>
				<input
					type='text'
					placeholder='search place'
					className='PlaceSearcherInput'
					list='states-cities-list'
					onChange={onChangeInput}
					value={stateOrCity}
					onKeyDown={onEnterKeyDown}
				/>
				<datalist id='states-cities-list'>
					{filteredStatesCitiesList.map((stateOrCity, i) => (
						<option
							key={i}
							value={stateOrCity.name}
							label={`${stateOrCity.country}, ${stateOrCity.name}`}></option>
					))}
				</datalist>
			</div>
			<WordButton
				label='Add'
				style={{ height: 36, marginLeft: 9, width: 60, padding: 0 }}
				onClick={onClickAdd}
			/>
			{/* {alertInfo && <AlertMessage {...alertInfo} />} */}
		</div>
	);
}

const getStatesCitiesList = () => {
	const statesList: IState[] = State.getAllStates();

	const listOfStatesAndCities: StateCity[] = [];

	statesList.forEach((state) => {
		const country = Country.getCountryByCode(state.countryCode);
		if (country) {
			listOfStatesAndCities.push({
				country: country.name,
				name: state.name,
				latitude: state.latitude ? Number(state.latitude) : undefined,
				longitude: state.longitude
					? Number(state.longitude)
					: undefined,
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
