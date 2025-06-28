export interface Msg {
	id: string;
	content: string;
	role:'user' | 'assistant' | 'system'
	timestamp: Date;
}

