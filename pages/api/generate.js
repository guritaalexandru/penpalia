import {sendBadRequest, sendMethodNotAllowed, sendOk,} from '@/js/utils/apiMethods.js';
import {SYSTEM_PROMPTS, generateCheckLanguagePrompt,} from '@/js/utils/promptsUtils.js';
import {chatCompletion,} from '@/js/utils/functions.js';
import {ERRORS,} from '@/js/utils/constants.js';

const checkLanguage = async (res, input) => {
	const messagesArray = [
		SYSTEM_PROMPTS.YES_NO.MESSAGE,
		generateCheckLanguagePrompt(input)
	];

	const response = await chatCompletion(messagesArray, SYSTEM_PROMPTS.YES_NO.MAX_TOKENS, SYSTEM_PROMPTS.YES_NO.TEMPERATURE);
	const responseText = response?.message?.content;
	return responseText.toLowerCase().includes('yes');
};

const converse = async (res, inputChat, type) => {
	const MAX_MEMORY = 3;
	let userMessagesArray = [];
	let useCase = {};

	if(inputChat.length > MAX_MEMORY) {
		userMessagesArray = inputChat.slice( -1 * MAX_MEMORY);
	}
	else {
		userMessagesArray = inputChat;
	}

	switch (type) {
		case SYSTEM_PROMPTS.SIMPLE_ASSISTANT.TYPE:
			useCase = SYSTEM_PROMPTS.SIMPLE_ASSISTANT;
			break;
		case SYSTEM_PROMPTS.MICHAEL_SCOTT.TYPE:
			useCase = SYSTEM_PROMPTS.MICHAEL_SCOTT;
			break;
		default:
			return sendBadRequest(res, ERRORS.WRONG_CONVERSATION_TYPE.message);
	}

	const messagesArray = [
		useCase.MESSAGE,
		...userMessagesArray
	];

	const response = await chatCompletion(messagesArray, useCase.MAX_TOKENS, useCase.TEMPERATURE);
	return sendOk(res, response);
};

export default async function handler(req, res) {
	const isAllowedMethod = req.method === 'POST';
	console.log('Incoming request: ', req.method, req.body);
	const {
		messages: inputChat,
		verifyLanguage: verifyLanguage,
		type: conversationType,
	} = req.body;

	if (!inputChat) {
		return sendBadRequest(res, 'Missing input messages');
	}
	if (!conversationType) {
		return sendBadRequest(res, 'wrong_conversation_type');
	}
	if(!isAllowedMethod) {
		return sendMethodNotAllowed(res);
	}

	try{
		if(req.method === 'POST') {
			if(!verifyLanguage) {
				return converse(res, inputChat, conversationType);
			}

			const lastMessage = inputChat[inputChat.length - 1].content;
			const isDesiredLanguage = await checkLanguage(res, lastMessage);

			if(isDesiredLanguage) {
				console.log('Desired language');
				return converse(res, inputChat, conversationType);
			}
			else {
				return sendBadRequest(res, ERRORS.WRONG_LANGUAGE.type, ERRORS.WRONG_LANGUAGE.message);
			}
		}
		else {
			return sendMethodNotAllowed(res);
		}
	}
	catch(error) {
		console.error(error);
		return sendBadRequest(res, ERRORS.OPEN_AI_ERROR.type, ERRORS.OPEN_AI_ERROR.message);
	}
}