import {sendBadRequest, sendMethodNotAllowed,} from '@/js/utils/apiMethods.js';
import {ALLOWED_CONVERSATION_TYPES, ERRORS,} from '@/js/utils/constants.js';
import {checkLanguage, converse,} from '@/js/utils/functions.js';

export default async function handler(req, res) {
	const isAllowedMethod = req.method === 'POST';
	console.log('Incoming request: ', req.method, req.body);
	const {
		messages: inputChat,
		verifyLanguage: verifyLanguage,
		type: conversationType,
	} = req.body;

	if (!inputChat) {
		return sendBadRequest(res, 'Missing input messages');
	}
	else if (!conversationType || !ALLOWED_CONVERSATION_TYPES.CONVERSE.includes(conversationType)) {
		return sendBadRequest(res, 'wrong_conversation_type');
	}
	else if (!isAllowedMethod) {
		return sendMethodNotAllowed(res);
	}

	try{
		if(req.method === 'POST') {
			if(!verifyLanguage) {
				return converse(res, inputChat, conversationType);
			}

			const lastMessage = inputChat[inputChat.length - 1].content;
			const isDesiredLanguage = await checkLanguage(res, lastMessage);

			if(isDesiredLanguage) {
				console.log('Desired language');
				return converse(res, inputChat, conversationType);
			}
			else {
				return sendBadRequest(res, ERRORS.WRONG_LANGUAGE.type, ERRORS.WRONG_LANGUAGE.message);
			}
		}
		else {
			return sendMethodNotAllowed(res);
		}
	}
	catch(error) {
		console.error(error);
		return sendBadRequest(res, ERRORS.OPEN_AI_ERROR.type, ERRORS.OPEN_AI_ERROR.message);
	}
}