export const onEnterKeyDown = (
	event: React.KeyboardEvent<HTMLInputElement>
) => {
	if (event.code === enterKeyCode) {
		event.currentTarget.blur();
	}
};

const enterKeyCode = 'Enter';
