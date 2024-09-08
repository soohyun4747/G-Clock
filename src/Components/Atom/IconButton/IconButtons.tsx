import { HTMLAttributes } from 'react';
import './IconButton.css';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
	icon: JSX.Element;
	disabled?: boolean;
}

export function IconButton(props: IconButtonProps) {
	return (
		<button
			className='iconButton'
			disabled={props.disabled}
			{...props}>
			{props.icon}
		</button>
	);
}
