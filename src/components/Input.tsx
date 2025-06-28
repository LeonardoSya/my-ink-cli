import React from 'react';
import { useInput } from '../hooks/useInput.js';
import { Box, Text } from 'ink';

interface IProps {
	onSubmit: (msg: string) => void
	placeholder?: string;
}

export const Input: React.FC<IProps> = ({
	onSubmit,
	// placeholder = '现在我能为猫总做什么呢'
}) => {
	const { inputState } = useInput({ onSubmit })

	return (
		<Box flexDirection='column'>
			<Text> &gt; {inputState.curInput} <Text color="greenBright" dimColor></Text>█</Text>
			<Box marginTop={1}>
				<Text color="gray" dimColor>
					💡 按Enter询问小蛙助手，Esc和他说拜拜
				</Text>
			</Box>
		</Box>
	)
}