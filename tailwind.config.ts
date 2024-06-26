import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				"token-text-primary": "var(--text-primary)",
				"token-main-surface-primary": "var(--main-surface-primary)",
				"token-border-medium": "var(--border-medium)",
				"token-text-tertiary": "var(--text-tertiary)",
				"token-text-secondary": "var(--text-secondary)",
				"token-main-surface-secondary": "var(--main-surface-secondary)",
				"token-text-quaternary": "var(--text-quaternary)",
				"token-border-light": "var(--border-light)",
				"token-sidebar-surface-primary": "var(--sidebar-surface-primary)",
				"token-sidebar-surface-secondary": "var(--sidebar-surface-secondary)",
				medium: "var(--border-medium)",
			},
		},
	},
	plugins: [],
};
export default config;
