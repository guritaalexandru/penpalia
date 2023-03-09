import React from 'react';

const BOT_NAME = 'Bot:';
const USER_NAME = 'You:';

export default function ChatMessage(props) {
	const { messageObject, } = props;
	const { role, content, } = messageObject;

	return (
		<li className={ 'py-3' }>
			<span className={ `block ${role === 'assistant' ? 'text-green-800' : 'text-blue-800'} font-bold` }>
				{role === 'assistant' ? BOT_NAME : USER_NAME}
			</span>
			<span className={ 'block' }>
				{content}
			</span>
		</li>
	);
}