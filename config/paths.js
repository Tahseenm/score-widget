'use strict'

const path = require('path')


/**
 PATHS
 Export all the paths required for webpack configuration from a single place.
 */

const appEntryPath    = path.resolve('src/index.js')
const outputDirPath   = path.resolve('dist')
const templatePath    = path.resolve('public/index.html')
const nodeModulesPath = path.resolve('node_modules')
const publicDirPath   = path.resolve('public')


module.exports = {
  appEntryPath,
  outputDirPath,
  templatePath,
  nodeModulesPath,
  publicDirPath,
}
