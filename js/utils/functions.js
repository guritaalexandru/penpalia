import {postCompletionEvent,} from '@/js/utils/serverCalls.js';
import {openai,} from '@/lib/openai.js';
import {
	generateCheckLanguagePrompt,
	generateSimpleSentenceWithWordsPrompt,
	SYSTEM_PROMPTS,
} from '@/js/utils/promptsUtils.js';
import {sendBadRequest, sendOk,} from '@/js/utils/apiMethods.js';
import {ERRORS,} from '@/js/utils/constants.js';

export const adaptQuery = query => {
	return Object.keys(query).reduce((acc, key) => {
		const value = query[key];
		let adaptedValue = value;

		if(value.includes(',')) {
			const splitValue = value.split(',');
			adaptedValue = {
				$all: splitValue,
			};
		}

		return {
			...acc,
			[key]: adaptedValue,
		};
	}, {});
};

export const chatCompletion = async (messagesArray, max_tokens, temperature = 1) => {
	const rawResponse = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: messagesArray,
		max_tokens: max_tokens,
		temperature: temperature,
	});

	postCompletionEvent(messagesArray, rawResponse.data);

	return rawResponse?.data?.choices[0];
};

export const checkLanguage = async (res, input) => {
	const messagesArray = [
		SYSTEM_PROMPTS.YES_NO.MESSAGE,
		generateCheckLanguagePrompt(input)
	];

	const response = await chatCompletion(messagesArray, SYSTEM_PROMPTS.YES_NO.MAX_TOKENS, SYSTEM_PROMPTS.YES_NO.TEMPERATURE);
	const responseText = response?.message?.content;
	return responseText.toLowerCase().includes('yes');
};

export const converseOneResponse = async (res, input, useCase) => {
	const inputArray = input.split(',');
	const messagesArray = [
		useCase.MESSAGE,
		generateSimpleSentenceWithWordsPrompt(inputArray)
	];

	const response = await chatCompletion(messagesArray, useCase.MAX_TOKENS, useCase.TEMPERATURE);
	const responseText = response?.message?.content;

	return sendOk(res, responseText);
};

export const converseChat = async (res, inputChat, useCase) => {
	const MAX_MEMORY = 3;
	let userMessagesArray = [];

	if(inputChat.length > MAX_MEMORY) {
		userMessagesArray = inputChat.slice( -1 * MAX_MEMORY);
	}
	else {
		userMessagesArray = inputChat;
	}

	const messagesArray = [
		useCase.MESSAGE,
		...userMessagesArray
	];

	const response = await chatCompletion(messagesArray, useCase.MAX_TOKENS, useCase.TEMPERATURE);
	return sendOk(res, response);
};

export const converse = (res, input, type) => {
	switch (type) {
		case SYSTEM_PROMPTS.SIMPLE_ASSISTANT.TYPE:
			return converseChat(res, input, SYSTEM_PROMPTS.SIMPLE_ASSISTANT);
		case SYSTEM_PROMPTS.MICHAEL_SCOTT.TYPE:
			return converseChat(res, input, SYSTEM_PROMPTS.MICHAEL_SCOTT);
		case SYSTEM_PROMPTS.SIMPLE_ASSISTANT_GENERATE_SENTENCE.TYPE:
			return converseOneResponse(res, input, SYSTEM_PROMPTS.SIMPLE_ASSISTANT_GENERATE_SENTENCE);
		default:
			return sendBadRequest(res, ERRORS.WRONG_CONVERSATION_TYPE.message);
	}
};