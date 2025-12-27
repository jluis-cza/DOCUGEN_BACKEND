import globals from 'globals';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      // "no-console": "warn",
      // "capitalized-comments": "always"
    },
  },
];
