import './Dropdown.css';

export interface DropdownOption {
	value: string | number;
	label: string;
}

export interface DropdownProps {
	options: DropdownOption[];
	value: string | number;
	style?: React.CSSProperties;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Dropdown(props: DropdownProps) {
	return (
		<div
			className='DropdownContainerDiv'
			style={props.style}>
			<select
				value={props.value}
				className='DropdownSelect'
				onChange={props.onChange}
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
