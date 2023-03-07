import {sendBadRequest, sendMethodNotAllowed, sendOk,} from '@/js/utils/apiMethods.js';
import {SYSTEM_PROMPTS, generateCheckLanguagePrompt, generateSimpleResponsePrompt,} from '@/js/utils/promptsUtils.js';
import {chatCompletion,} from '@/js/utils/functions.js';

const checkLanguage = async (res, input) => {
	const CHECK_LANGUAGE_MAX_TOKENS = 5;

	const messagesArray = [
		SYSTEM_PROMPTS.YES_NO,
		generateCheckLanguagePrompt(input)
	];

	const response = await chatCompletion(messagesArray, CHECK_LANGUAGE_MAX_TOKENS);
	const responseText = response?.message?.content;
	return responseText.toLowerCase().includes('yes');
};

const converse = async (res, input) => {
	const SIMPLE_CONVERSE_MAX_TOKENS = 50;

	const messagesArray = [
		SYSTEM_PROMPTS.SIMPLE_ASSISTANT,
		generateSimpleResponsePrompt(input)
	];

	const response = await chatCompletion(messagesArray, SIMPLE_CONVERSE_MAX_TOKENS);
	return sendOk(res, response);
};

export default async function handler(req, res) {
	const isAllowedMethod = req.method === 'POST';
	const inputText = req?.body?.input;

	if (!inputText) {
		return sendBadRequest(res, 'Missing input text');
	}
	if(!isAllowedMethod) {
		return sendMethodNotAllowed(res);
	}

	if(req.method === 'POST') {
		const isDesiredLanguage = await checkLanguage(res, inputText);
		if(isDesiredLanguage) {
			return converse(res, inputText);
		}
		else {
			return sendBadRequest(res, 'Input text is not in the desired language');
		}
	}
	else {
		return sendMethodNotAllowed(res);
	}
}