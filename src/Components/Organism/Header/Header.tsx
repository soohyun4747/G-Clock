import { LogoIcon } from 'Icons/Logo';
import './Header.css';
import { SetStateAction } from 'react';
import {
	AlertMessageProps,
	AlertMessageSet,
} from 'Components/Atom/AlertMessage/AlertMessage';

interface HeaderProps {
	setAlertInfo: React.Dispatch<SetStateAction<AlertMessageProps | undefined>>;
}

export function Header(props: HeaderProps) {
	const copyUrlToClipboard = () => {
		const currentUrl = window.location.href; // Get the current URL
		navigator.clipboard
			.writeText(currentUrl) // Use the clipboard API
			.then(() => {
				AlertMessageSet(
					props.setAlertInfo,
					'Link copied to clipboard',
					'success'
				);
			})
			.catch((err) => {
				AlertMessageSet(props.setAlertInfo, 'Failed to copy', 'error');
				console.error('Failed to copy: ', err);
			});
	};

	return (
		<div className='HeaderContainerDiv'>
			<div className='HeaderLogoGroupDiv CursorPointer'>
				<LogoIcon />
				<div className='HeaderTitleDiv HeaderTextDiv'>
					Global Time Converter
				</div>
			</div>
			<div
				className='HeaderTextDiv CursorPointer'
				onClick={copyUrlToClipboard}>
				copy link
			</div>
		</div>
	);
}
