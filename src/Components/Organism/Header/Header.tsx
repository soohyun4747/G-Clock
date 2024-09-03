import { LogoIcon } from 'Icons/Logo';

export function Header() {
	return (
		<div className='HeaderContainerDiv'>
			<div className='HeaderLogoGroupDiv'>
				<LogoIcon />
				<div className='HeaderTitleDiv HeaderTextDiv'>G-Time Converter</div>
			</div>
            <div className='HeaderTextDiv'>copy link</div>
		</div>
	);
}
