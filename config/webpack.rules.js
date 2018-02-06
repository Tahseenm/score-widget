'use strict'

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const babelConfig   = require('./babel')
const postCSSConfig = require('./postcss')
const {
  validateEnv,
  isProduction,
  isDevelopment,
} = require('./helpers')


const MEDIA_FILENAME = 'media/[name].[hash:8].[ext]'

/*
 +-----------------------------------------------------------------------------+
 |  Javascript Rules                                                           |
 +-----------------------------------------------------------------------------+

 [1]. Does not include superfluous whitespace characters and line terminators.
 [2]. `babel-loader`: Cache results in ./node_modules/.cache/babel-loader/ for
 faster rebuilds.
 */

/* :: string -> Object */
const js = (env) => {
  validateEnv(env)

  const config = {
    test: /\.(js|jsx|mjs)$/,
    include: path.resolve('src'),
    loader: require.resolve('babel-loader'),
    options: Object.assign(
      babelConfig(env),
      { babelrc: false },
    ),
  }

  if (isProduction(env))  config.options.compact = true         /* [1] */
  if (isDevelopment(env)) config.options.cacheDirectory = true  /* [2] */

  return config
}



/*
 +-----------------------------------------------------------------------------+
 |  Styles Rules                                                               |
 +-----------------------------------------------------------------------------+

 [1]. Turn CSS into JS modules and inject them into <style> tags. Enable Hot
 module replacement for great development experience.
 [2]. Enable CSS modules that has a identifier that includes the name of the
 file and name of the class along with the hash.
 [3]. Configure number of loaders that should be applied to @imported resources
 before css-loader (postcss + sass = 2).
 [4]. Currently uses postcss.config.js for config.
 [5]. Webpack requires an identifier (ident) in options when {Function}/require
 is used (https://webpack.js.org/loaders/postcss-loader/#plugins).
 [6]. It moves all the required css modules into a separate CSS file for faster
 parallel loading. Works in conjuction with the ExtractTextPlugin.
 [7]. On code splitting, async modules will load css imports using style loader.
 */

/* :: string -> object */
const styles = (env) => {
  validateEnv(env)

  const test = /\.(sass|scss|css)$/
  const styleLoader = require.resolve('style-loader')      /* [1] */
  const cssLoader = {
    loader: require.resolve('css-loader'),
    options: {
      modules: false,                                      /* [2] */
      localIdentName: '[name]__[local]-[hash:base64:5]',   /* [2] */
      importLoaders: 2,                                    /* [3] */
      minimize: isProduction(env),
      sourceMap: true,
    },
  }

  const postCSSLoader = {                                  /* [4] */
    loader: require.resolve('postcss-loader'),
    options: Object.assign(
      postCSSConfig(env),
      {
        ident: 'postcss',                                  /* [5] */
        sourceMap: true,
      },
    ),
  }

  const sassLoader = {
    loader: require.resolve('sass-loader'),
    options: {
      sourceMap: true,
    },
  }


  let config

  if (isProduction(env)) {
    config = {
      test,
      loader: ExtractTextPlugin.extract({                  /* [6] */
        fallback: {                                        /* [7] */
          loader: styleLoader,
          options: {
            hmr: false,
          },
        },

        use: [cssLoader, postCSSLoader, sassLoader],  /* <- Module */
      }),
    }
  }

  if (isDevelopment(env)) {
    config = {
      test,
      use: [styleLoader, cssLoader, postCSSLoader, sassLoader],  /* <- Module */
    }
  }

  return config
}



/*
 +-----------------------------------------------------------------------------+
 |  Image Rules                                                                |
 +-----------------------------------------------------------------------------+

 @NOTE: The rules are the same for all enviroments.
 [1]. Inline assets as base64 string if they are below the given limit to avoid
 additional requests, otherwise defer generation to file-loader.
 */

/* :: () -> object */
const images = () => ({
  test: [
    /\.bmp$/,
    /\.gif$/,
    /\.jpe?g$/,
    /\.png$/,
  ],
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,  /* [1] */
    name: MEDIA_FILENAME,
  },
})



/*
 +-----------------------------------------------------------------------------+
 |  Fallback Rules                                                             |
 +-----------------------------------------------------------------------------+

 @NOTE: The rules are the same for all enviroments.
 [1]. Exclude `js` files to keep css-loader working. [Source: CRA]
 */

/* :: () -> Object */
const fallback = () => ({
  exclude: [
    /\.js$/,    /* [1] */
    /\.html$/,
    /\.json$/,
  ],
  loader: require.resolve('file-loader'),
  options: {
    name: MEDIA_FILENAME,
  },
})


module.exports = {
  js,
  styles,
  images,
  fallback,
}
