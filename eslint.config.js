import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
	{
		ignores: [
			"**/dist/**",
			"**/build/**",
			"**/paclet/**",
			"**/node_modules/**",
			// Bun test files run under `bun test` (their own types) and are
			// excluded from the tsc project, so type-aware linting can't resolve
			// them via the project service.
			"**/*.test.ts",
			"**/*.test.tsx",
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
