/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./js/components/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['Roboto'],
			},
			screens: {
				'mobile': '380px',
				'large-mobile': '540px',
				'tablet': '640px',
				'm-tablet': '820px',
				'large-tablet': '992px',
				'laptop': '1025px',
				'desktop': '1400px',
				'wide': '1950px',
			},
			colors: {
			},
		},
	},
	plugins: [
	],
};
