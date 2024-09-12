import { onEnterKeyDown } from 'util/Component';
import './Textfield.css';
import { HTMLAttributes } from 'react';

export interface TextfieldProps {
	style?: React.CSSProperties;
	inputAttributes?: HTMLAttributes<HTMLInputElement>;
	value: string | number;
	setValue: React.Dispatch<React.SetStateAction<string | number>>;
	onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
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
				{...props.inputAttributes}
				value={props.value}
				onChange={onChangeInput}
				// style={props.inputStyle}
				onBlur={props.onBlur}
				onKeyDown={onEnterKeyDown}
			/>
		</div>
	);
}
