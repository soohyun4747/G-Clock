import { useState } from 'react';
import './GroupButton.css';

export interface ButtonProps {
	label: string;
	value: string | number;
	onClick: (value: string | number) => void;
}

export interface GroupButtonProps {
	value: string | number;
	buttonsProps: ButtonProps[];
	selectedColor?: string;
	width?: number;
	height?: number;
}

export function GroupButton(props: GroupButtonProps) {

	return (
		<div
			className='GroupButtonContainerDiv'
			style={{ width: props.width, height: props.height }}>
			{props.buttonsProps.map((btnProps, i) => (
				<div key={i} className='GroupButtonInnerContainerDiv'>
					<div
						className='GroupButtonInnerDiv'
						style={{
							background:
								btnProps.value === props.value
									? props.selectedColor ?? '#d7d7d7'
									: 'none',
						}}
						onClick={() => btnProps.onClick(btnProps.value)}>
						{btnProps.label}
					</div>
					{i < props.buttonsProps.length - 1 && (
						<div className='GroupButtonLineDiv' />
					)}
				</div>
			))}
		</div>
	);
}
