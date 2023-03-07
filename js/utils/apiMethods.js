/* eslint-disable no-magic-numbers */
export const sendOk = (res, data) => {
	res.status(200).json(
		{
			'data': data,
		}
	);
};

export const sendNotFound = (res, message) => {
	res.status(404).json(
		{
			'error': message,
		}
	);
};

export const sendBadRequest = (res, type, message) => {
	res.status(400).json(
		{
			'error_type': type,
			'error': message,
		}
	);
};

export const sendMethodNotAllowed = res => {
	res.status(405).json(
		{
			'error': 'Method not allowed',
		}
	);
};