module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:react/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-module': 'off',
    "@typescript-eslint/prefer-namespace-keyword": "off",
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto',
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error', 'debug', 'info'] }],
    'no-restricted-syntax': [
      // catch unexpected console log bugs
      'error',
      {
        selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|debug|trace)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
    // 'no-param-reassign': [2, { props: false }],
    'import/first': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'max-len': [
      'error',
      {
        code: 250,
        ignorePattern: 'className',
        ignoreUrls: true,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'no-undef': 1
  },
}