'use strict'


/**
 +-----------------------------------------------------------------------------+
 |  JEST Config                                                                |
 +-----------------------------------------------------------------------------+

 [1]. Must define this as this config file is not in the project root directory.
 [2]. Add support for .mjs ES module.
 [3]. This is the default jest transform. Has to be redefined if setting
 transform option.
 [4]. Add support for file imports: such as images, fonts and others. Transform
 that turns file imports into filenames.
 [5]. Do not transform any javascript files from the node_modules directory.
 [6]. Enable CSS module support. `identity-obj-proxy` simple returns the name
 of the property that was accessed on a object.
 @example
   import styles from './buttons'

   console.log(styles.buttonLarge)   -> 'buttonLarge'
   console.log(styles.buttonBlock)   -> 'buttonBlock'
   console.log(styles.buttonPrimary) -> 'buttonPrimary'
 https://facebook.github.io/jest/docs/en/configuration.html
 */

const jsFiles    = '^.+\\.(js|jsx|mjs)$'
const styleFiles = '^.+\\.(css|scss|sass)$'
const otherFiles = '^(?!.*\\.(js|jsx|mjs|css|scss|sass|json)$)'

const config = {
  rootDir: process.cwd(),                                     /* [1] */

  setupFiles: [
    '<rootDir>/src/setupTests.js',
  ],

  collectCoverageFrom: [
    'src/**/*.{js,jsx,mjs}',
  ],

  coveragePathIgnorePatterns: [
    '<rootDir>/src/setupTests.js',
    '<rootDir>/src/global.js',
    '<rootDir>/src/index.js',
    '<rootDir>/node_modules/',
  ],

  testMatch: [                                                /* [2] */
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}',
  ],

  testEnvironment: 'node',
  transform: {
    [jsFiles]: '<rootDir>/node_modules/babel-jest',           /* [3] */
    [otherFiles]: '<rootDir>/config/jest.fileTransform.js',   /* [4] */
  },

  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',           /* [5] */
  ],

  moduleNameMapper: {
    [styleFiles]: 'identity-obj-proxy',                       /* [6] */
  },

  moduleFileExtensions: [
    'mjs',                                                    /* [2] */
    'js',
    'json',
    'jsx',
    'node',
  ],
}


module.exports = config
