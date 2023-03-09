import React from 'react';

export default function Layout({ children, }) {
	return <div className="main-layout">
		<div className="custom-container">
			<main className=''>{children}</main>
		</div>
	</div>;
}