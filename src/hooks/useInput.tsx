import { useState } from 'react';
import { useInput as useInkInput } from 'ink';

interface InputState {
	curInput: string;
	isComposing: boolean;
}

interface IOptions {
	onSubmit: (msg: string) => void;
	onExit?: () => void;
}

export const useInput = ({ onSubmit, onExit }: IOptions) => {
	const [inputState, setInputState] = useState<InputState>({
		curInput: '',
		isComposing: false,
	});

	useInkInput((input, key) => {
		if (key.return) {
			/** send msg */
			const msg = inputState.curInput.trim();
			if (msg) {
				onSubmit(msg);
				setInputState(prev => ({ ...prev, curInput: '' }));
			}
		} else if (key.backspace || key.delete) {
			/** del string */
			setInputState(prev => ({ ...prev, curInput: prev.curInput.slice(0, -1) }))
		} else if (key.ctrl && input === 'c' || key.escape) {
			/** esc */
			onExit?.() || process.exit(0)
		} else if (input && !key.ctrl && !key.meta) {
			/** input */
			setInputState(prev => ({ ...prev, curInput: prev.curInput + input, isComposing: true }))
		}
	});

	return {
		inputState,
		clearInput: () => setInputState(prev => ({...prev, curInput: ''}))
	}
};
