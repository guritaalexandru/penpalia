import React from 'react';
import {DESIRED_LANGUAGE, ERRORS,} from '@/js/utils/constants.js';
import {postAPICall,} from '@/js/utils/clientCalls.js';

const filterChatHistory = chatHistory => {
	const filteredChatHistory = [];
	for( let i = 0; i < chatHistory.length; i++ ){
		const currMessage = chatHistory[i];
		const nextMessage = chatHistory[i+1];

		if( i === chatHistory.length - 1 || (currMessage.type !== 'error' && nextMessage?.type !== 'error' && currMessage.role !== nextMessage?.role) ){
			filteredChatHistory.push(currMessage);
		}
	}

	return filteredChatHistory;
};

const buildResponseMessageObject = response => {
	let responseMessageObject;

	if(!response?.data?.message){
		const errorType = response?.error_type;
		let errorMessage;

		switch (errorType) {
			case ERRORS.WRONG_LANGUAGE.type:
				errorMessage = `Please use ${DESIRED_LANGUAGE}.`;
				break;
			case ERRORS.OPEN_AI_ERROR.type:
				errorMessage = 'Error while processing the request. Please try again later.';
				break;
			default:
				errorMessage = 'Something went wrong. Please try again later.';
		}

		responseMessageObject = {
			type: 'error',
			content: errorMessage,
		};
	}
	else{
		responseMessageObject = response.data.message;
	}

	return responseMessageObject;
};

export default function ChatComponent(props) {
	const [chatMessages, setChatMessages] = React.useState([]);

	const handleKeyDown = async event => {
		if (event.key === 'Enter') {
			console.log('Enter key pressed');
			const currentMessage = event.target.value;
			event.target.value = '';

			const currentMessageObject = {
				role: 'user',
				content: currentMessage,
			};

			setChatMessages(prevChat => [...prevChat, currentMessageObject]);
			const currentChatHistory = [...chatMessages, currentMessageObject];
			const filteredChatHistory = filterChatHistory(currentChatHistory);

			const response = await postAPICall('/api/generate', {
				messages: filteredChatHistory,
			});
			console.log(response);

			const responseMessageObject = buildResponseMessageObject(response);
			setChatMessages(prevChat => [...prevChat, responseMessageObject]);

		}
	};

	return (
		<div>
			<h1>Chat Component</h1>
			<div>
				{ chatMessages.map(message => {
					return (
						<div key={ Math.random() }>
							{ message.content }
						</div>
					);
				})
				}
			</div>
			<div>
				<input
					id={ 'chat-input' }
					type={ 'text' }
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					placeholder="Type something..."
					onKeyDown={ handleKeyDown } />
			</div>
		</div>
	);
}