import { useCallback, useState } from "react";
import { Msg } from "../types/chat.js"

interface ChatState {
	msgs: Msg[]
	isLoading: boolean;
	err?: string
}

export const useChat = () => {
	const [chatState, setChatState] = useState<ChatState>({
		msgs: [],
		isLoading: false,
	})

	const addMsg = useCallback((content: string, role: Msg['role']) => {
		const newMsg: Msg = {
			id: Date.now().toString(),
			content,
			role,
			timestamp: new Date(),
		}

		setChatState(prev => ({ ...prev, msgs: [...prev.msgs, newMsg] }))
	}, [])

	const addUserMsg = useCallback((c: string) => {
		addMsg(c, 'user')
	}, [addMsg])

	const addAssistantMsg = useCallback((c: string) => {
		addMsg(c, 'assistant')
	}, [addMsg])

	const setLoading = useCallback((isLoading: boolean) => {
		setChatState(prev => ({ ...prev, isLoading }))
	}, [])

	const setErr = useCallback((err?: string) => {
		setChatState(prev => ({ ...prev, err }))
	}, [])

	return {
		chatState,
		addUserMsg,
		addAssistantMsg,
		setLoading,
		setErr,
	}
}