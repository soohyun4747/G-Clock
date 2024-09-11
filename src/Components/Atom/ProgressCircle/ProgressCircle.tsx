import { CircularProgress } from '@mui/material';
import './ProgressCircle.css';

export function ProgressCircle() {
	return (
		<div className='ProgressCircleContainerDiv'>
			<CircularProgress className='ProgressCircleDiv' />
		</div>
	);
}
