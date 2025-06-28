import React from 'react'
import { Msg } from '../types/chat.js'
import { Box, Text } from 'ink';

interface IProps {
	msgs: Msg[]
	isLoading?: boolean;
}

export const MsgList: React.FC<IProps> = ({
	msgs,
	isLoading = false
}) => {
	const getMsgColor = (role: Msg['role']) => {
		switch (role) {
			case 'user': return 'grayBright'
			case 'assistant': return 'cyanBright'
			case 'system': return 'yellow'
			default: return 'white'
		}
	}

	const getMsgPrefix = (role: Msg['role']) => {
		switch (role) {
			case 'user': return '🐱: '
			case 'assistant': return '🐸: '
			case 'system': return '🔮 System: '
			default: return ''
		}
	}

	return (
		<Box flexDirection='column' flexGrow={1} paddingX={1}>
			{msgs.map(msg => (
				<Box key={msg.id} marginBottom={1}>
					<Text color={getMsgColor(msg.role)}>
						{getMsgPrefix(msg.role)}{msg.content}
					</Text>
				</Box>
			))}

			{isLoading && (
				<Box>
					<Text color='gray'>
						💭 小蛙思考中...
					</Text>
				</Box>
			)}
		</Box>
	)
}