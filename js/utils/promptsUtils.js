import {DESIRED_LANGUAGE,} from '@/js/utils/constants.js';

export const SYSTEM_PROMPTS = {
	YES_NO: {
		'role': 'system',
		'content': 'You only respond with YES or NO.',
	},
	SIMPLE_ASSISTANT: {
		'role': 'system',
		'content': 'You are a human talking with a friend. You respond with simple sentences.',
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
