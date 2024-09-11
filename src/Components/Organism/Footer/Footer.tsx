import { LogoIcon } from 'Icons/Logo';
import './Footer.css';

export function Footer() {
	const onClickMail = () => {
		window.location.href = `mailto:${emailAddress}`;
	};

	return (
		<div className='FooterContainerDiv'>
			<div className='FooterTextDiv FooterRightsDiv'>
				@ 2024 Global Time Converter all rights reserved
			</div>
			<div className='FooterLogoDiv CursorPointer'>
				<LogoIcon />
				<div className='FooterTitleDiv'>Global Time Converter</div>
			</div>
			<div
				className='FooterTextDiv CursorPointer FooterEmailDiv'
				onClick={onClickMail}>
				{emailAddress}
			</div>
		</div>
	);
}

const emailAddress = 'gtimeconverter@gmail.com';
