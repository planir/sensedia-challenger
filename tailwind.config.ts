import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		colors: {
			silver: "#3D3D3D",
			white: "#ffffff",
			primary: "#7E50CE",
			secondary: "#8556AA",
			"gray-25": "#E2E2E2",
			"gray-light-0": "#E0E0E0",
			"gray-light": "#f3f2f2",
			"gray-medium-light": "#9E9E9E",
			"gray-medium": "#9E9E9E",
			"gray-high-medium": "#707070",
			"gray-high": "#919191",
			"gray-75": "#6A6A6A",
			"gray-100": "#303030",
			"red-500": "red"
		},
	},
	plugins: [],
};
export default config;
