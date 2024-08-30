import { useState } from 'react';
import './GroupButton.css';

export interface GroupButtonProps {
	value: number;
	labels: string[];
	selectedColor?: string;
	width?: number;
	height?: number;
	setValue: React.Dispatch<React.SetStateAction<number>>;
}

export function GroupButton(props: GroupButtonProps) {
	const onClickButton = (i: number) => {
		props.setValue(i);
	};

	return (
		<div
			className='GroupButtonContainerDiv'
			style={{ width: props.width, height: props.height }}>
			{props.labels.map((label, i) => (
				<div className='GroupButtonInnerContainerDiv'>
					<div
						className='GroupButtonInnerDiv'
						style={{
							background:
								i === props.value
									? props.selectedColor ?? '#d7d7d7'
									: 'none',
						}}
						onClick={() => onClickButton(i)}>
						{label}
					</div>
					{i < props.labels.length - 1 && (
						<div className='GroupButtonLineDiv' />
					)}
				</div>
			))}
		</div>
	);
}
