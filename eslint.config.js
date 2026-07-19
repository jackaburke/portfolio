import eslintPluginAstro from 'eslint-plugin-astro';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';

export default [
  // add more generic rule sets here, such as:
  js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    // component frontmatter is TypeScript
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tsParser
      }
    }
  },
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    }
  }
];