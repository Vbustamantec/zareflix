import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"black": "#0a0a0a",
				"dark-gray": "#18181C",
			},
			fontFamily: {
				sans: ["var(--font-roboto-flex)", "sans-serif"],
			},
		},
	},
	plugins: [],
} satisfies Config;
