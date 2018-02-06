'use strict'

const webpack = require('webpack')

/** Webpack Plugins */
const HtmlWebpackPlugin             = require('html-webpack-plugin')
const CaseSensitivePathsPlugin      = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')

const rules = require('./webpack.rules')
const {
  templatePath,
  nodeModulesPath,
  appEntryPath,
  outputDirPath,
} = require('./paths')


/*
 +---------------------------------------------------------------------------+
 |                                                                           |
 |                               Development                                 |
 |                                                                           |
 +---------------------------------------------------------------------------+*/

const ENV = 'development'

/**
 +-----------------------------+
 | Webpack Development Plugins |
 +-----------------------------+

 [1]. Make global constants available to javascript to be configured at compile
 time. Allows different behaviour between development & production  enviroments.
 [2]. Turn off script injection & manually inject them in template head. Plugin
 supports head injection but doesn't allow custom attributes like `async`.
 [3]. Replaces module IDs with paths to the modules for better development
 experience.
 [4]. Enforce the entire path of all required modules to match the exact case of
 the actual path on disk. Avoid conflicts with different OS's.
 [5]. Avoid restarting server after installing missing module. Credit [CRA]
 */
const plugins = [
  new webpack.DefinePlugin({                                /* [1] */
    'process.env': {
      NODE_ENV: JSON.stringify(ENV),
    },
  }),
  new HtmlWebpackPlugin({
    template: templatePath,
    inject: false,                                          /* [2] */
  }),
  new webpack.NamedModulesPlugin(),                         /* [3] */
  new webpack.HotModuleReplacementPlugin(),
  new CaseSensitivePathsPlugin(),                           /* [4] */
  new WatchMissingNodeModulesPlugin(nodeModulesPath),       /* [5] */
]



/**
 +---------------------------+
 | Development Configuration |
 +---------------------------+

 Webpack configuration without any production optimisations.

 [1]. Include useful path info about modules, exports, requests, etc. into the
 generated code.
 [2]. Make missing exports a error instead of a warning.
 [3]. Only the first matching Rule is used. When none match file loader is used
 as default which output files and returns their paths.
 [4]. Automatically resolve these extensions. Add support for .mjs & .jsx
 extensions.
 [5]. Provide empty object mock for libraries that import Node modules to make them
 work for the browser enviroment. [Credit: CRA]
 https://webpack.js.org/configuration/node/
 [6]. Turn off performance hints during development, warnings are unnecessary for
 development.
 */
const CONFIG = {
  entry: {
    app: appEntryPath,
  },

  output: {
    path: outputDirPath,
    filename: 'js/bundle.[name].js',
    chunkFilename: 'js/chunk.[name].js',
    pathinfo: true,                                /* [1] */
  },

  module: {
    strictExportPresence: true,                    /* [2] */
    rules: [
      {
        oneOf: [                                   /* [3] */
          rules.images(ENV),
          rules.js(ENV),
          rules.styles(ENV),
          rules.fallback(ENV),
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.mjs', '.js', '.json', '.jsx'],  /* [4] */
  },

  plugins,

  devtool: 'cheap-module-source-map',
  node: {                                          /* [5] */
    child_process: 'empty',
    dgram: 'empty',
    net: 'empty',
    tls: 'empty',
    fs: 'empty',
  },

  performance: {
    hints: false,                                  /* [6] */
  },
}


module.exports = CONFIG
