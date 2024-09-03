import './Dropdown.css';

export interface DropdownOption {
	value: string | number;
	label: string;
}

export interface DropdownProps {
	options: DropdownOption[];
	value: string | number;
	style?: React.CSSProperties;
	setValue: React.Dispatch<React.SetStateAction<string | number>>;
}

export function Dropdown(props: DropdownProps) {
	const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		props.setValue(event.target.value);
	};

	return (
		<div className='DropdownContainerDiv' style={props.style}>
			<select
				value={props.value}
				className='DropdownSelect'
				onChange={onChangeSelect}
				onSelect={(e) => {
					console.log(e);
				}}>
				{props.options.map((option, i) => (
					<option
						key={i}
						value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}
