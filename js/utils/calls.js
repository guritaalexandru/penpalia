import {connectToDatabase,} from '@/lib/mongodb';

const getRouteCollection = async collectionName => {
	const {database,} = await connectToDatabase();
	return database.collection(collectionName);
};