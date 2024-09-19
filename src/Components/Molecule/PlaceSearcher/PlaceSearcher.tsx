import './PlaceSearcher.css';
import {
	State,
	Country,
	IState,
	City,
	ICity,
	ICountry,
} from 'country-state-city';
import { SetStateAction, useState } from 'react';
import { WordButton } from 'Components/Atom/WordButton/WordButton';
import {
	AlertMessageProps,
	AlertMessageSet,
} from 'Components/Atom/AlertMessage/AlertMessage';
import Fuse from 'fuse.js';
import { enterKeyCode } from 'util/Component';
import { removeSpacesAndSigns } from 'util/String';
import { List, ListItem, ListItemButton } from '@mui/material';

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
	const [isListOpen, setIsListOpen] = useState<boolean>(false);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStateOrCity(event.target.value);

		const filteredList = fuse
			.search(event.target.value)
			.slice(0, 5) // Take the top 5 results
			.map((result) => result.item);

		setFilteredStatesCitiesList(filteredList);

		if (filteredList.length > 0) {
			setIsListOpen(true);
		}
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

	const onClickListItemButton = (value: string) => {
		setStateOrCity(value);
		setIsListOpen(false);
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
					// list='states-cities-list'
					onChange={onChangeInput}
					value={stateOrCity}
					onKeyDown={onEnterKeyDown}
				/>
				{/* <datalist id='states-cities-list'>
					{filteredStatesCitiesList.map((stateOrCity, i) => (
						<option
							key={i}
							value={stateOrCity.name}
							label={`${stateOrCity.country}, ${stateOrCity.name}`}></option>
					))}
				</datalist> */}
				{isListOpen && (
					<List className='PlaceSearcherList'>
						{filteredStatesCitiesList.map((stateOrCity, i) => (
							<ListItem
								className='PlaceSearcherListItem'
								key={i}>
								<ListItemButton
									className='PlaceSearcherListItemButton'
									onClick={() =>
										onClickListItemButton(stateOrCity.name)
									}>
									<div className='PlaceSearcherListItemDiv'>
										{stateOrCity.name}
									</div>
									<div className='PlaceSearcherListItemDiv2'>{`${stateOrCity.country}, ${stateOrCity.name}`}</div>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				)}
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
	const citiesList: ICity[] = City.getAllCities();	

	const listOfStatesAndCities: StateCity[] = [];

	const pushToListOfStatesAndCities = (
		country: ICountry,
		stateOrCity: IState | ICity
	) => {
		listOfStatesAndCities.push({
			country: country.name,
			name: stateOrCity.name,
			latitude: stateOrCity.latitude
				? Number(stateOrCity.latitude)
				: undefined,
			longitude: stateOrCity.longitude
				? Number(stateOrCity.longitude)
				: undefined,
		});
	};

	statesList.forEach((state) => {
		const country = Country.getCountryByCode(state.countryCode);
		if (country) {
			pushToListOfStatesAndCities(country, state)
		}
	});

	// citiesList.forEach((city) => {
	// 	const country = Country.getCountryByCode(city.countryCode);

	// 	if (
	// 		country &&
	// 		!listOfStatesAndCities.some((item) => item.name === city.name)
	// 	) {
	// 		pushToListOfStatesAndCities(country, city)
	// 	}
	// });

	return listOfStatesAndCities;
};

const statesCitiesList = getStatesCitiesList();

const fuse = new Fuse(statesCitiesList, {
	includeScore: true,
	keys: ['country', 'name'],
	threshold: 0.3, // Adjust this threshold to control sensitivity
});
