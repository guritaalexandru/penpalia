export const LANGUAGES = {
	ENGLISH: 'english',
	ROMANIAN: 'romanian',
	SWEDISH: 'swedish',
};
export const DESIRED_LANGUAGE = LANGUAGES.ROMANIAN;

export const DATABASE_COLLECTIONS = {
	COMPLETION_EVENTS: 'completion_events',
};

export const ERRORS = {
	WRONG_LANGUAGE: {
		type: 'wrong_language',
		message: 'The language of the input is not the desired one.',
	},
	OPEN_AI_ERROR: {
		type: 'open_ai_error',
		message: 'Error while processing the request.',
	},
};