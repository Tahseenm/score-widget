'use strict'

const {
  getPolyfillIOUrl,
} = require('../helpers')


describe('getPolyfillIOUrl()', () => {
  const polyfillsSettings = {
    Map: true,
    Set: true,
    Symbol: false,
    fetch: true,
    matchMedia: false,
  }

  test('Returns a string', () => {
    const expected = 'string'
    const actual = typeof getPolyfillIOUrl(polyfillsSettings)

    expect(actual).toEqual(expected)
  })

  test('Returns the correct url with default options', () => {
    const expected = 'https://cdn.polyfill.io/v2/polyfill.min.js?features=Map,Set,fetch&flags=gated'
    const actual = getPolyfillIOUrl(polyfillsSettings)

    expect(actual).toEqual(expected)
  })


  describe('options', () => {
    test('minimize', () => {
      const output = getPolyfillIOUrl(polyfillsSettings, { minimize: false })

      const expected = false
      const actual = output.includes('min')

      expect(actual).toEqual(expected)
    })

    test('gated', () => {
      const output = getPolyfillIOUrl(polyfillsSettings, { gated: false })

      const expected = false
      const actual = output.includes('gated')

      expect(actual).toEqual(expected)
    })

    test('callback', () => {
      const output = getPolyfillIOUrl(
        polyfillsSettings,
        { callback: 'onPolyfillLoad' },
      )

      const expected = true
      const actual = output.includes('callback=onPolyfillLoad')

      expect(actual).toEqual(expected)
    })
  })
})
