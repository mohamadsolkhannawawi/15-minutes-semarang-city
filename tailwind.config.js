/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"brand-dark-blue": "#2A3A4E",
				"brand-medium-blue": "#5B7A9A",
				"brand-light-blue": "#9DB2C8",
				"brand-accent": "#F0EAD6",
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"], // Ganti jika Anda punya font spesifik
			},
			backgroundImage: {
				"main-page-bg": "url('/src/assets/images/semarang-background.jpg')",
			},
		},
	},
	plugins: [],
};
