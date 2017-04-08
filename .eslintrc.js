module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  plugins: [
    'html'
  ],
  'rules': {
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-underscore-dangle': 0,
    'comma-dangle': [
      1,
      "always-multiline"
    ],
    'no-unused-vars': 1,
    'no-param-reassign': 0,
    'semi': [ 1, 'never' ],
    'no-shadow': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 0
  }
}
