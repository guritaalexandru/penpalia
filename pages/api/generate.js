import {DESIRED_LANGUAGE,} from '@/js/utils/constants.js';

import {sendBadRequest, sendMethodNotAllowed, sendOk,} from '@/js/utils/apiMethods.js';
import {openai,} from '@/lib/openai.js';
import {postCompletionEvent,} from '@/js/utils/calls.js';

const SYSTEM_PROMPTS = {
	YES_NO: {
		'role': 'system',
		'content': 'You only respond with YES or NO.',
	},
	SIMPLE_ASSISTANT: {
		'role': 'system',
		'content': 'You are a human talking with a friend.',
	},
};

const generateCheckLanguagePrompt = input => {
	return {
		'role': 'user',
		'content': `${PART_PROMPTS.LANGUAGE_CHECK} ${input}`,
	};
};

const generateSimpleResponsePrompt = input => {
	return {
		'role': 'user',
		'content': `${input}`,
	};
};

const PART_PROMPTS = {
	LANGUAGE_CHECK: `Is the next phrase in ${DESIRED_LANGUAGE}?`,
};

const checkLanguage = async (res, input) => {
	const messagesArray = [
		SYSTEM_PROMPTS.YES_NO,
		generateCheckLanguagePrompt(input)
	];

	const rawResponse = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: messagesArray,
		max_tokens: 5,
	});

	postCompletionEvent(messagesArray, rawResponse.data);

	const textResponse = rawResponse.data.choices[0].message.content;
	return textResponse.toLowerCase().includes('yes');
};

const converse = async (res, input) => {
	const messagesArray = [
		SYSTEM_PROMPTS.SIMPLE_ASSISTANT,
		generateSimpleResponsePrompt(input)
	];

	const response = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: messagesArray,
		max_tokens: 50,
	});

	postCompletionEvent(messagesArray, response.data);

	return sendOk(res, response.data.choices[0]);
};

export default async function handler(req, res) {
	const isAllowedMethod = req.method === 'GET';
	const inputText = req?.body?.input;

	if (!inputText) {
		return sendBadRequest(res, 'Missing input text');
	}
	if(!isAllowedMethod) {
		return sendMethodNotAllowed(res);
	}

	if(req.method === 'GET') {
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