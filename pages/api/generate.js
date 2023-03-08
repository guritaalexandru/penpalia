import {sendBadRequest, sendMethodNotAllowed, sendOk,} from '@/js/utils/apiMethods.js';
import {SYSTEM_PROMPTS, generateCheckLanguagePrompt,} from '@/js/utils/promptsUtils.js';
import {chatCompletion,} from '@/js/utils/functions.js';
import {ERRORS,} from '@/js/utils/constants.js';

const checkLanguage = async (res, input) => {
	const CHECK_LANGUAGE_MAX_TOKENS = 5;
	const MIN_TEMPERATURE = 0.1;

	const messagesArray = [
		SYSTEM_PROMPTS.YES_NO,
		generateCheckLanguagePrompt(input)
	];

	const response = await chatCompletion(messagesArray, CHECK_LANGUAGE_MAX_TOKENS, MIN_TEMPERATURE);
	const responseText = response?.message?.content;
	return responseText.toLowerCase().includes('yes');
};

const converse = async (res, inputChat) => {
	const SIMPLE_CONVERSE_MAX_TOKENS = 50;
	const MAX_MEMORY = 3;
	let userMessagesArray = [];

	if(inputChat.length > MAX_MEMORY) {
		userMessagesArray = inputChat.slice( -1 * MAX_MEMORY);
	}
	else {
		userMessagesArray = inputChat;
	}

	const messagesArray = [
		SYSTEM_PROMPTS.SIMPLE_ASSISTANT,
		...userMessagesArray
	];

	const response = await chatCompletion(messagesArray, SIMPLE_CONVERSE_MAX_TOKENS);
	return sendOk(res, response);
};

export default async function handler(req, res) {
	const isAllowedMethod = req.method === 'POST';
	console.log('Incoming request: ', req.method, req.body);
	const inputChat = req.body?.messages;

	if (!inputChat) {
		return sendBadRequest(res, 'Missing input messages');
	}
	if(!isAllowedMethod) {
		return sendMethodNotAllowed(res);
	}

	try{
		if(req.method === 'POST') {
			const lastMessage = inputChat[inputChat.length - 1].content;
			const isDesiredLanguage = await checkLanguage(res, lastMessage);

			if(isDesiredLanguage) {
				console.log('Desired language');
				return converse(res, inputChat);
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