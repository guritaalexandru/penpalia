import {postCompletionEvent,} from '@/js/utils/serverCalls.js';
import {openai,} from '@/lib/openai.js';

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