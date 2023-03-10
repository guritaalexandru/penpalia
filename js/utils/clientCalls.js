import {ENDPOINTS,} from '@/js/utils/constants.js';

export const postAPICall = async ( route, data) => {
	try{
		const response = await fetch(route, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			signal: AbortSignal.timeout(10000),
		});
		return response.json();
	}
	catch(error){
		console.error(error);
		return error;
	}
};

export const getDictionary = async () => {
	try{
		const response = await fetch(ENDPOINTS.DICTIONARY);
		return await response.json();
	}
	catch(error){
		console.error(error);
		return error;
	}
};