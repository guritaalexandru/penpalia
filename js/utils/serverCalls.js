import {connectToDatabase,} from '@/lib/mongodb.js';
import {DATABASE_COLLECTIONS, DESIRED_LANGUAGE,} from '@/js/utils/constants.js';
import {getAllObjects, postObject,} from '@/js/utils/mongoMethods.js';

const getCollection = async collectionName => {
	const {database,} = await connectToDatabase();
	return database.collection(`${collectionName}_${DESIRED_LANGUAGE}`);
};

export const postCompletionEvent = async (requestMessagesArray, responseObject) => {
	const routeCollection = await getCollection(DATABASE_COLLECTIONS.COMPLETION_EVENTS);

	const completionEvent = {
		model: responseObject.model,
		usage: responseObject.usage,
		response: responseObject.choices[0].message.content,
		request: requestMessagesArray,
	};

	return postObject(routeCollection, completionEvent);
};

export const getDictionary = async (queryOptions = {}) => {
	const routeCollection = await getCollection(DATABASE_COLLECTIONS.DICTIONARY);

	return getAllObjects(routeCollection, queryOptions);
};