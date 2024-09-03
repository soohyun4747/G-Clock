import './Textfield.css';

export interface TextfieldProps {
	style?: React.CSSProperties;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function Textfield(props: TextfieldProps) {
	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.setValue(event.target.value);
	};

	return (
		<div
			className='TexfieldContainerDiv'
			style={props.style}>
			<input
				className='TextfieldInput'
				value={props.value}
				onChange={onChangeInput}
			/>
		</div>
	);
}
