import React, { useEffect, useRef, } from 'react';
import ChatMessage from '@/js/components/Parts/ChatMessage.jsx';

export default  function MessagesBox(props) {
	const messagesEndRef = useRef(null);

	const { chatMessages, } = props;
	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: 'smooth', });
	};
	useEffect(scrollToBottom, [chatMessages]);

	return (
		<div className={ 'h-[400px] overflow-auto px-[20px]' }>
			<ul className={ 'divide-y divide-gray-200' }>
				<ChatMessage messageObject={{role: 'assistant', content: 'Hi, I am a ChatBot. How can I help you?',}}/>
				{ chatMessages.map((message, index) => {
					return (
						<ChatMessage
							messageObject={ message }
							key={ index }/>
					);
				})
				}
			</ul>
			<div ref={ messagesEndRef } />
		</div>
	);
}
