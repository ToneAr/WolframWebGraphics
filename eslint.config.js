import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
	{
		ignores: [
			"**/dist/**",
			"**/build/**",
			"**/node_modules/**",
			"**/*.nb",
			"**/*.vsnb",
			"**/*.wl",
			"**/*.m",
		],
	},
	// Type-checked linting for the TypeScript sources.
	{
		files: ["**/*.ts", "**/*.tsx"],
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
		],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				...globals.browser,
			},
		},
	},
	// Plain JS (vite configs, etc.) — no type-aware rules, Node globals.
	{
		files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
		extends: [js.configs.recommended],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
	// Must stay last: turn off rules that Prettier already owns.
	prettier,
);
