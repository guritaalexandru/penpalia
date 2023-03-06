import {ObjectId,} from 'mongodb';

export const getAllObjects = (collection, queryObject = {}) => {
	return collection.find(queryObject).toArray();
};

export const getFieldsFromAllObjects = (collection, queryObject = {}, fieldsObject = {}) => {
	return collection.find(queryObject).project(fieldsObject).toArray();
};

export const getObjectById = (collection, id) => {
	return collection.findOne({
		_id: ObjectId(id),
	});
};

export const getObjectByFields = (collection, queryObject = {}) => {
	return collection.findOne(queryObject);
};

export const postObject = (collection, object) => {
	return collection.insertOne(object);
};