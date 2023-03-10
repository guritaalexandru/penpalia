import {sendBadRequest, sendMethodNotAllowed, sendOk,} from '@/js/utils/apiMethods.js';
import {getDictionary,} from '@/js/utils/serverCalls.js';
import {ERRORS,} from '@/js/utils/constants.js';
import {adaptQuery,} from '@/js/utils/functions.js';

export default async function handler(req, res) {
	const isAllowedMethod = req.method === 'GET';

	if(!isAllowedMethod) {
		return sendMethodNotAllowed(res);
	}

	try{
		if(req.method === 'GET') {
			const {query,} = req;

			const adaptedQuery = adaptQuery(query);

			const dictionaryItems = await getDictionary(adaptedQuery || {});
			return sendOk(res, dictionaryItems);
		}
		else {
			return sendMethodNotAllowed(res);
		}
	}
	catch(error) {
		console.error(error);
		return sendBadRequest(res, ERRORS.DATABASE_ERROR.type, ERRORS.DATABASE_ERROR.message);
	}
}