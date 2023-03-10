import {DESIRED_LANGUAGE,} from '@/js/utils/constants.js';

export const SYSTEM_PROMPTS = {
	YES_NO: {
		MESSAGE: {
			'role': 'system',
			'content': 'You only respond with YES or NO.',
		},
		TEMPERATURE: 0.1,
		MAX_TOKENS: 5,
		TYPE: 'yes_no',
	},
	SIMPLE_ASSISTANT: {
		MESSAGE: {
			'role': 'system',
			'content': 'You are a simple assistant. You respond with simple sentences.',
		},
		TEMPERATURE: 1,
		MAX_TOKENS: 50,
		TYPE: 'simple_assistant',
	},
	SIMPLE_ASSISTANT_GENERATE_SENTENCE: {
		MESSAGE: {
			'role': 'system',
			'content': 'You are a simple assistant. You respond with simple sentences.',
		},
		TEMPERATURE: 1,
		MAX_TOKENS: 100,
		TYPE: 'simple_assistant_generate_sentence',
	},
	MICHAEL_SCOTT: {
		MESSAGE: {
			'role': 'system',
			'content': 'You are pretending to be Michael Scott from The Office. You try to be funny, occasionally making "That\'s what she said" jokes.',
		},
		TEMPERATURE: 1,
		MAX_TOKENS: 100,
		TYPE: 'michael_scott',
	},
};

export const generateCheckLanguagePrompt = input => {
	return {
		'role': 'user',
		'content': `Is the next phrase in ${DESIRED_LANGUAGE}? ${input}`,
	};
};

export const generateSimpleSentenceWithWordsPrompt = inputArray => {
	const input = inputArray.join(', ');
	return {
		'role': 'user',
		'content': `Generate a sentence in ${DESIRED_LANGUAGE} including the following words: ${input}. Translate it to English.`,
	};
};

export const generateSimpleResponsePrompt = input => {
	return {
		'role': 'user',
		'content': `${input}`,
	};
};
