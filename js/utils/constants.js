import {SYSTEM_PROMPTS,} from '@/js/utils/promptsUtils.js';

export const LANGUAGES = {
	ENGLISH: 'english',
	ROMANIAN: 'romanian',
	SWEDISH: 'swedish',
};
export const DESIRED_LANGUAGE = LANGUAGES.SWEDISH;

export const DATABASE_COLLECTIONS = {
	COMPLETION_EVENTS: 'completion_events',
	DICTIONARY: 'dictionary',
};

export const ENDPOINTS = {
	CONVERSE: '/api/converse',
	DICTIONARY: '/api/dictionary',
	ANSWER: '/api/answer',
};

export const ALLOWED_CONVERSATION_TYPES = {
	CONVERSE: [
		SYSTEM_PROMPTS.SIMPLE_ASSISTANT.TYPE,
		SYSTEM_PROMPTS.MICHAEL_SCOTT.TYPE
	],
	ANSWER: [
		SYSTEM_PROMPTS.SIMPLE_ASSISTANT_GENERATE_SENTENCE.TYPE
	],
};

export const ERRORS = {
	DATABASE_ERROR: {
		type: 'database_error',
		message: 'Error while processing the request.',
	},
	WRONG_LANGUAGE: {
		type: 'wrong_language',
		message: 'The language of the input is not the desired one.',
	},
	WRONG_CONVERSATION_TYPE: {
		type: 'wrong_conversation_type',
		message: 'The conversation type is not known.',
	},
	OPEN_AI_ERROR: {
		type: 'open_ai_error',
		message: 'Error while processing the request.',
	},
};