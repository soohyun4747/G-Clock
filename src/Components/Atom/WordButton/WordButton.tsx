import './WordButton.css';

export interface WordButtonProps {
	label: string;
	style?: React.CSSProperties;
	onClick?: () => void;
}

export function WordButton(props: WordButtonProps) {
	return (
		<div
			className='WordButtonContainerDiv'
			style={props.style}
			onClick={props.onClick}>
			{props.label}
		</div>
	);
}
