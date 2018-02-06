/**
 @NOTE: React 16 depends on requestAnimationFrame. This gets rid of the jest
 warning. This must be included first.
 */
global.requestAnimationFrame = callback => setTimeout(callback, 0)


/**
 [1]. Can't use es6 module import as `requestAnimationFrame` must be poltfilled
 before requiring any dependencies.
 [2]. Setup Enzyme to work with React 16.
 */

/* eslint-disable */                          /* [1] */
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
/* eslint-enable */

Enzyme.configure({ adapter: new Adapter() })  /* [2] */
