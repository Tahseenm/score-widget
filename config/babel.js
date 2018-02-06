'use strict'

const browsersList = require('./browsersList')
const {
  validateEnv,
} = require('./helpers')


/*
 +-----------------------------------------------------------------------------+
 |  BABEL Config                                                               |
 +-----------------------------------------------------------------------------+

 [1]. Dont transpile ES Modules to commonjs. Webpack can handle ES Modules and
 offers features like Tree shaking.
 [2]. By default, preset-env uses browserslist config sources. Ignore them.
 */

/* :: string -> Object */
const babelConfig = (env) => {
  validateEnv(env)

  const config = {
    presets: [
      'react',
      ['env', {
        modules: false,                  /* [1] */
        ignoreBrowserslistConfig: true,  /* [2] */
        targets: {
          browsers: browsersList(env),   /* [2] */
        },
      }],
    ],

    plugins: [
      'syntax-dynamic-import',
      'transform-object-rest-spread',
      'transform-class-properties',
    ],
  }

  return config
}


module.exports = babelConfig
