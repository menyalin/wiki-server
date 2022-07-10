module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-spacing': 'error',
    'trailing-comma': [true, { multiline: 'always', singleline: 'never' }],
    multiline: {
      delimiter: 'comma',
      requireLast: true,
    },
    singleline: {
      delimiter: 'comma',
      requireLast: true,
    },
    overrides: {
      interface: {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
      },
    },
  },
}
