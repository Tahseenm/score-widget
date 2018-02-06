/**
 @NOTE: isPromise is used in tests and should not be in production. This helper
 function will return false negative for javascript enviroments that do no
 support Promises natively such as Internet explorer.
 */

/** any -> boolean */
const isPromise = val => Object.prototype.toString.call(val).includes('Promise')

/** any -> boolean */
const isNull = val => val === null

/** any -> boolean */
const isObject = val => !isNull(val) && typeof val === 'object'

/** any -> boolean */
const isPlainObject = val => (
  isObject(val) && Object.getPrototypeOf(val) === Object.prototype
)


export {
  isPromise,
  isNull,
  isObject,
  isPlainObject,
}
