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
				black: "#0a0a0a",
				"dark-gray": "#18181C",
				primary: {
					DEFAULT: "#dc2626", // red-600
					hover: "#b91c1c", // red-700
					dark: "#991b1b", // red-800
				},
			},
			fontFamily: {
				sans: ["var(--font-roboto-flex)", "sans-serif"],
			},
			container: {
				center: true,
				padding: {
					DEFAULT: "1rem",
					sm: "2rem",
					lg: "4rem",
					xl: "5rem",
				},
			},
			keyframes: {
				shimmer: {
					"100%": { backgroundPosition: "-100% 0" },
				},
			},
			animation: {
				shimmer: "shimmer 2s infinite",
			},
		},
	},
	plugins: [],
} satisfies Config;
