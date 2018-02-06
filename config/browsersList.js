'use strict'

/* eslint import/newline-after-import: 0 */
const path   = require('path')
const appPkg = require(path.resolve('package.json'))
const {
  validateEnv,
  isDevelopment,
} = require('./helpers')


/**
 For use in webpack & webpack loader configurations.
 [1]. A sensible list of browsers developers use for development. Used for
 babel `env` preset. Most of these browsers have full ES6 support so
 transpilation should be faster.
 */
const development = [              /* [1] */
  'last 2 Chrome versions',
  'last 2 Safari major versions',
  'last 2 Edge versions',
  'last 2 Firefox versions',
]
const production = appPkg.browserslist


/* :: string -> Array<string> */
const browsersList = (env) => {
  validateEnv(env)

  return isDevelopment(env) ? development : production
}


module.exports = browsersList
