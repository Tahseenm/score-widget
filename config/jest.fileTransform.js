'use strict'

const path = require('path')


/**
 File Transformer
 A custom Jest transformer turning file imports into filenames. These files can
 be images, fonts or any other file that is not of type script or style.
 https://facebook.github.io/jest/docs/en/webpack.html
 */
const $$Transformer = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))}`
  },
}


module.exports = $$Transformer
