import React from 'react';
import { Box, Text } from 'ink';
import { useChat } from './hooks/useChat.js'
import { MsgList } from './components/MsgList.js'
import { Input } from './components/Input.js'

interface Props { }

export default function App({ }: Props) {
	const { chatState, addUserMsg, addAssistantMsg } = useChat()

	const handleUserMsg = (msg: string) => {
		addUserMsg(msg)

		setTimeout(() => {
			addAssistantMsg(`${msg}...暂用mock数据`)
		}, 1000)
	}

	return (
		<Box flexDirection="column" height={20}>
			<Box>
				<Text color="cyanBright" bold>
					🔮 Hi, I'm your Frog Assistant ~~ 🐸
				</Text>
			</Box>
			<Box>
				<Text color="greenBright" inverse>现在我能为猫总做什么呢?</Text>
			</Box>

			<MsgList msgs={chatState.msgs} isLoading={chatState.isLoading} />
			<Input onSubmit={handleUserMsg} />
		</Box>
	);
}
