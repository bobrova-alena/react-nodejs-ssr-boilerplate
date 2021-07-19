const resolveRelativeAppRoot = require('./utils/resolvePath').resolveRelativeAppRoot;
const getPathInternal = pattern => ({ pattern, group: 'internal' });
const importOrder = {
  pathGroups: [getPathInternal('~**'), getPathInternal('~**/**')],
  groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
  alphabetize: { order: 'asc' },
  'newlines-between': 'always',
};

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
      project: resolveRelativeAppRoot('./tsconfig.json'),
      ecmaFeatures: {
        jsx: true,
      },
      warnOnUnsupportedTypeScriptVersion: true,
  },
  ignorePatterns: ['*/*.js'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  plugins: ['import', 'react-hooks'],
  rules: {
    indent: ['warn', 2, { SwitchCase: 1 }],
    'no-multi-spaces': ['warn'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    "prettier/prettier": ["warn"],
    'import/order': ['error', importOrder],
    'import/no-duplicates': 'error',
    'curly': ['error', 'all'],
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    react: { version: 'detect' },
  },
};
  