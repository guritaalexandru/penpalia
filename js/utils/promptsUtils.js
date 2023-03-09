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

export const PART_PROMPTS = {
	LANGUAGE_CHECK: `Is the next phrase in ${DESIRED_LANGUAGE}?`,
};

export const generateCheckLanguagePrompt = input => {
	return {
		'role': 'user',
		'content': `${PART_PROMPTS.LANGUAGE_CHECK} ${input}`,
	};
};

export const generateSimpleResponsePrompt = input => {
	return {
		'role': 'user',
		'content': `${input}`,
	};
};
