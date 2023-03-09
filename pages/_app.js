import React from 'react';
import '@/styles/globals.css';
import Layout from '@/js/components/Layout/Layout.jsx';

export default function App({ Component, pageProps, }) {
	return (
		<Layout>
			<Component { ...pageProps } />
		</Layout>
	);
}
