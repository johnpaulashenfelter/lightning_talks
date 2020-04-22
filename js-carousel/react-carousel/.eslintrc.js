module.exports = {
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    node: true,
  },
  parser: 'babel-eslint',
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'],
  },
  settings: {
    react: {
      version: '16.4.2',
    },
  },
};
