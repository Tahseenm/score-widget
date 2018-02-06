module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: [
    'compat',
  ],

  env: {
    jest: true,
  },

  rules: {
    'compat/compat': 1,
    semi: [2, 'never'],
    'no-multiple-empty-lines': [2, { max: 3 }],
    'no-multi-spaces': 0,
    'react/jsx-filename-extension': 0,
    'react/sort-comp': 0,
  },

  settings: {
    polyfills: ['promises']
  }
}
