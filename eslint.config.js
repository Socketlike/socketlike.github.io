/* eslint-env node */
// import '@rushstack/eslint-patch/modern-module-resolution'

import { includeIgnoreFile } from '@eslint/compat'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import vueTS from '@vue/eslint-config-typescript'
import vuePrettier from '@vue/eslint-config-prettier/skip-formatting'

export default [
  includeIgnoreFile(path.resolve(__dirname, '.gitignore')),
  ...vue.configs['flat/recommended'],
  js.configs.recommended,
  ...vueTS(),
  vuePrettier,
  {
    files: [
      '**/*.vue',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      'vue/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['src/views/**/*.vue', 'src/**/*.ts'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
