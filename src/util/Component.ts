export const onEnterKeyDown = (
	event: React.KeyboardEvent<HTMLInputElement>
) => {
	if (event.code === enterKeyCode) {
		event.currentTarget.blur();
	}
};

export const enterKeyCode = 'Enter';
