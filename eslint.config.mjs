import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin';
import parserTypeScript from '@typescript-eslint/parser';
import nextPlugin from 'eslint-plugin-next';

/** @type {import('eslint').Linter.Config} */
export default {
  ignores: ['node_modules/', '.next/', 'out/', 'dist/'],
  plugins: {
    '@typescript-eslint': eslintPluginTypeScript,
    import: eslintPluginImport,
    next: nextPlugin
  },
  languageOptions: {
    parser: parserTypeScript,
    parserOptions: {
      project: './tsconfig.json',
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  rules: {
    // Evita variáveis não usadas
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Proíbe uso de 'any'
    '@typescript-eslint/no-explicit-any': 'error',

    // Exige ponto e vírgula
    'semi': ['error', 'always'],

    // Aspas simples
    'quotes': ['error', 'single', { avoidEscape: true }],

    // Ordena imports
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ],

    // Limita linhas em branco consecutivas
    'no-multiple-empty-lines': ['error', { max: 1 }],

    // Obriga chaves em blocos de controle
    'curly': ['error', 'all'],

    // Exige tipagem explícita em funções públicas
    '@typescript-eslint/explicit-function-return-type': 'warn'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
};
