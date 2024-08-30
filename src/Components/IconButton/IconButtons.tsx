import { HTMLAttributes } from 'react';
import './IconButton.css';

interface IconButtonProps extends HTMLAttributes<HTMLDivElement> {
	icon: JSX.Element;
}

export function IconButton(props: IconButtonProps) {
	return (
		<div
			className='iconButtonDiv'
			{...props}>
			{props.icon}
		</div>
	);
}
