'use strict'

/**
 Extra eslint rules for config directory. Will be using commonjs modules instead
 of ES modules.
 */
module.exports = {
  env: {
    jest: true,
  },

  rules: {
    'strict': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-dynamic-require': 0,
  },
}
