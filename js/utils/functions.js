import {postCompletionEvent,} from '@/js/utils/calls.js';
import {openai,} from '@/lib/openai.js';

export const chatCompletion = async (messagesArray, max_tokens) => {
	const rawResponse = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: messagesArray,
		max_tokens: max_tokens,
	});

	postCompletionEvent(messagesArray, rawResponse.data);

	return rawResponse?.data?.choices[0];
};