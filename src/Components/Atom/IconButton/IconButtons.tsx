import { ClassAttributes, HTMLAttributes, useRef } from 'react';
import './IconButton.css';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
	icon: JSX.Element;
	disabled?: boolean;
}

export function IconButton(props: IconButtonProps) {
	return (
		<button
			className='iconButton'
			{...props}
			disabled={props.disabled}>
			{props.icon}
		</button>
	);
}
