'use strict'

/*
 +-----------------------------------------------------------------------------+
 |  Enviroment Helpers                                                         |
 +-----------------------------------------------------------------------------+
 */

/* :: string -> void */
const validateEnv = (env) => {
  const isInvalid = !(['production', 'development'].includes(env))

  if (isInvalid) throw new Error(`${env} is a invalid enviroment.`)
}

/* :: string -> boolean */
const isProduction = env => env === 'production'

/* :: string -> boolean */
const isDevelopment = env => env === 'development'



/*
 +-----------------------------------------------------------------------------+
 |  Polyfill.io Helpers                                                        |
 +-----------------------------------------------------------------------------+

 [1]. With the `gated` flag the polyfills are wrapped in a feature detect. This
 gaurds against mistargeting, incorrect user agent interpretation, and conflicts
 with other polyfills that may be on the same page.
 [2]. Useful for loading polyfills asyncrously.
 */

/* :: (Object, ?Object) -> string */
const getPolyfillIOUrl = (
  pollyfillsSetting,
  {
    minimize = true,
    callback = false,
    gated = true,
  } = {},
) => {
  const featuresNeeded = Object.entries(pollyfillsSetting)
    .filter(([, value]) => value === true)
    .map(([name]) => encodeURI(name))
    .join(',')

  const domain  = 'https://cdn.polyfill.io'

  let url = ''
  url += `${domain}/v2`
  url += minimize ? '/polyfill.min.js' : '/polyfill.js'
  url += `?features=${featuresNeeded}`
  url += gated ? '&flags=gated' : ''                                    /* [1] */
  url += (typeof callback === 'string') ? `&callback=${callback}` : ''  /* [2] */

  return url
}


module.exports = {
  validateEnv,
  isProduction,
  isDevelopment,
  getPolyfillIOUrl,
}
