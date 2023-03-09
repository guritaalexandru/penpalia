import React from 'react';
import {DESIRED_LANGUAGE, ERRORS,} from '@/js/utils/constants.js';
import {postAPICall,} from '@/js/utils/clientCalls.js';
import MessagesBox from '@/js/components/Parts/MessagesBox.jsx';
import {SYSTEM_PROMPTS,} from '@/js/utils/promptsUtils';

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
			if(!event.target.value)
				return;

			const currentMessage = event.target.value;
			event.target.value = '';
			event.target.disabled = true;

			const currentMessageObject = {
				role: 'user',
				content: currentMessage,
			};

			setChatMessages(prevChat => [...prevChat, currentMessageObject]);
			const currentChatHistory = [...chatMessages, currentMessageObject];
			const filteredChatHistory = filterChatHistory(currentChatHistory);

			const response = await postAPICall('/api/generate', {
				messages: filteredChatHistory,
				verifyLanguage: false,
				type: SYSTEM_PROMPTS.MICHAEL_SCOTT.TYPE,
			});
			event.target.disabled = false;
			event.target.focus();
			console.log(response);

			const responseMessageObject = buildResponseMessageObject(response);
			setChatMessages(prevChat => [...prevChat, responseMessageObject]);
		}
	};

	return (
		<div
			id='ChatBox'
			className={ 'w-full' }>
			<div className={ 'border border-b-0 rounded-lg border-gray-300' }>
				<div className={ 'border-b text-center px-[20px] py-[10px]' }>
					<span className={ 'text-md font-bold text-gray-900' }>
						This is a general conversation. You can ask me anything.
					</span>
				</div>
				<MessagesBox chatMessages={ chatMessages }/>
				<input
					id={ 'chat-input' }
					type={ 'text' }
					className="bg-gray-50 border border-gray-300 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
					placeholder="Type something..."
					onKeyDown={ handleKeyDown } />
			</div>
		</div>
	);
}