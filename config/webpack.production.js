'use strict'

const path = require('path')

const webpack = require('webpack')

/** Webpack Plugins */
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const UglifyJsPlugin     = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin  = require('extract-text-webpack-plugin')
const ManifestPlugin     = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin  = require('copy-webpack-plugin')

const rules = require('./webpack.rules')
const {
  publicDirPath,
  outputDirPath,
  templatePath,
  appEntryPath,
} = require('./paths')

const pollyfillSettings = require('./polyfills.json')
const {
  getPolyfillIOUrl,
} = require('./helpers')



/*
 +---------------------------------------------------------------------------+
 |                                                                           |
 |                               Production                                  |
 |                                                                           |
 +---------------------------------------------------------------------------+*/

const ENV = 'production'

/**
 +----------------------------+
 | Webpack Production Plugins |
 +----------------------------+

 [1]. Remove the build directory before building assets.
 @NOTE: Plugin does not accept absolute path and thinks its outside root so
 skips operation.
 [2]. HTML Webpack plugin will take care of building index.html template.
 [3]. Make global constants available to javascript to be configured at compile
 time. Allows different behaviour between development & production  enviroments.
 [4]. Turn off script injection & manually inject them in template head. Plugin
 supports head injection but doesn't allow custom attributes like `async`.
 [5]. Used by the template inside a script tag.
 [6]. Enable Scope Hoisting for faster & smaller builds (Webpack 3 feature).
 [7]. Works in conjuction with ExtractTextPlugin.extract() in style loader.
 */
const plugins = [
  new CleanWebpackPlugin([path.basename(outputDirPath)]),   /* [1] */
  new CopyWebpackPlugin([
    {
      from: publicDirPath,
      to: outputDirPath,
      ignore: ['index.html'],                               /* [2] */
    },
  ]),
  new webpack.DefinePlugin({                                /* [3] */
    'process.env': {
      NODE_ENV: JSON.stringify(ENV),
    },
  }),
  new HtmlWebpackPlugin({
    template: templatePath,
    inject: false,                                          /* [4] */
    minify: {
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
      removeComments: true,
      useShortDoctype: true,
      keepClosingSlash: true,
      collapseWhitespace: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeStyleLinkTypeAttributes: true,
    },

    polyfillIOUrl: getPolyfillIOUrl(pollyfillSettings),     /* [5] */
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),         /* [6] */
  new UglifyJsPlugin({
    sourceMap: true,
  }),
  new ExtractTextPlugin({                                   /* [7] */
    filename: 'css/[name].[contenthash:8].css',
  }),
  new ManifestPlugin({
    fileName: 'asset-manifest.json',
  }),
]



/**
 +---------------------------+
 | Development Configuration |
 +---------------------------+

 Webpack configuration for production, optimised for fast & small bundles.

 [1]. Make missing exports a error instead of a warning.
 [2]. Only the first matching Rule is used. When none match file-loader is used
 as default which output files and returns their paths.
 [3]. Automatically resolve these extensions. Add support for .mjs & .jsx
 extensions.
 [4]. Force webpack to exit on first error.
 [5]. Provide empty object mock for libraries that import Node modules to make
 them work for the browser enviroment. [Credit: CRA]
 https://webpack.js.org/configuration/node/
 */
const CONFIG = {
  entry: {
    app: appEntryPath,
  },

  output: {
    path: outputDirPath,
    filename: 'js/bundle.[name].[chunkhash:8].js',
    chunkFilename: 'js/chunk.[name].[chunkhash:8].js',
  },

  module: {
    strictExportPresence: true,                    /* [1] */
    rules: [
      {
        oneOf: [                                   /* [2] */
          rules.images(ENV),
          rules.js(ENV),
          rules.styles(ENV),
          rules.fallback(ENV),
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.mjs', '.js', '.json', '.jsx'],  /* [3] */
  },

  plugins,

  bail: true,                                      /* [4] */
  devtool: 'source-map',
  node: {                                          /* [5] */
    child_process: 'empty',
    dgram: 'empty',
    net: 'empty',
    tls: 'empty',
    fs: 'empty',
  },
}


module.exports = CONFIG
