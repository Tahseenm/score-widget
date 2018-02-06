'use strict'

/** Plugins */
const flexbugsFixes = require('postcss-flexbugs-fixes')
const autoprefixer  = require('autoprefixer')

const browsersList = require('./browsersList')
const {
  validateEnv,
} = require('./helpers')


/*
 +-----------------------------------------------------------------------------+
 |  PostCSS Config                                                             |
 +-----------------------------------------------------------------------------+

 Production & development have the same postCSS configuration.
 */

/* :: string -> Object */
const postCSSConfig = (env) => {
  validateEnv(env)

  const config = {
    plugins: [
      flexbugsFixes,
      autoprefixer({
        browsers: browsersList(env),
      }),
    ],
  }

  return config
}


module.exports = postCSSConfig
