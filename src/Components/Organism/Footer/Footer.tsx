import { LogoIcon } from 'Icons/Logo';
import './Footer.css'

export function Footer() {
	return (
		<div className='FooterContainerDiv'>
			<div className='FooterTextDiv'>@ 2024 G-Time Converter all rights reserved</div>
			<div className='FooterLogoDiv'>
				<LogoIcon />
				<div className='FooterTitleDiv'>G-Time Converter</div>
			</div>
			<div className='FooterTextDiv'>g-timeconverter@gmail.com</div>
		</div>
	);
}
