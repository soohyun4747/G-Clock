import { Alert, AlertColor } from '@mui/material';
import './AlertMessage.css';

export interface AlertMessageProps {
	message: string;
	severity: AlertColor;
}

export function AlertMessage(props: AlertMessageProps) {
	return (
		<div className='AlertMessageContainerDiv'>
			<Alert
				className='AlertMessageAlert'
				severity={props.severity}>
				{props.message}
			</Alert>
		</div>
	);
}

export const AlertMessageSet = (
	setAlertInfo: React.Dispatch<
		React.SetStateAction<AlertMessageProps | undefined>
	>,
	message: string,
	severity: AlertColor
) => {
	setAlertInfo({ message, severity });
	setTimeout(() => setAlertInfo(undefined), 2000);
};
