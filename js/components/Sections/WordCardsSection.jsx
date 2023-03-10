import React, {useEffect, useState,} from 'react';
import {getDictionary,} from '@/js/utils/clientCalls.js';
import WordCard from '@/js/components/Parts/WordCard.jsx';

export default function WordCardsSection(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [wordsObjects, setWordsObjects] = useState([]);

	useEffect(() => {
		const getWords = async () => {
			const wordsResponse = await getDictionary();
			setWordsObjects(wordsResponse.data);
		};

		getWords().then( () => setIsLoading(false));
	}, []);

	if (isLoading)
		return <div>Loading...</div>;

	return (
		<div className={ 'grid grid-cols-4 gap-4' }>
			{wordsObjects.map( wordObject => <WordCard
				key={ wordObject._id }
				wordObject={ wordObject } />)}
		</div>
	);
}
