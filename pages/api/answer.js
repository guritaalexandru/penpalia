import {sendBadRequest, sendMethodNotAllowed,} from '@/js/utils/apiMethods.js';
import {ALLOWED_CONVERSATION_TYPES, ERRORS,} from '@/js/utils/constants.js';
import {converse,} from '@/js/utils/functions.js';

export default function handler(req, res) {
	const isAllowedMethod = req.method === 'POST';
	console.log('Incoming request: ', req.method, req.body);
	const {
		input,
		type: conversationType,
	} = req.body;

	if (!input) {
		return sendBadRequest(res, 'Missing input');
	}
	else if (!conversationType || !ALLOWED_CONVERSATION_TYPES.ANSWER.includes(conversationType)) {
		return sendBadRequest(res, 'wrong_conversation_type');
	}
	else if(!isAllowedMethod) {
		return sendMethodNotAllowed(res);
	}

	try{
		if(req.method === 'POST') {
			return converse(res, input, conversationType);
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