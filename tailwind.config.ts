import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				"token-text-primary": "var(--text-primary)",
				"token-main-surface-primary": "var(--main-surface-primary)",
			},
		},
	},
	plugins: [],
};
export default config;
