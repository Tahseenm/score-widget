'use strict'

const babelConfig   = require('../babel')
const browsersList  = require('../browsersList')
const postCSSConfig = require('../postcss')


const PRODUCTION_ENV  = 'production'
const DEVELOPMENT_ENV = 'development'
const INVALID_ENV     = 'foobarbaz'


/**
 Babel Conifguration Tests
 */
describe('Babel Configuration', () => {
  test('Invalid Enviroment', () => {
    const getConfig = () => babelConfig(INVALID_ENV)
    expect(getConfig).toThrow()
  })

  test('Production Enviroment', () => {
    const config = babelConfig(PRODUCTION_ENV)
    expect(config).toMatchSnapshot()
  })

  test('Development Enviroment', () => {
    const config = babelConfig(DEVELOPMENT_ENV)
    expect(config).toMatchSnapshot()
  })
})


/**
 Browser Lists Configuration Tests
 */
describe('BrowsersList Configuration', () => {
  test('Invalid Enviroment', () => {
    const getConfig = () => browsersList(INVALID_ENV)
    expect(getConfig).toThrow()
  })

  test('Production Enviroment', () => {
    const config = browsersList(PRODUCTION_ENV)
    expect(config).toMatchSnapshot()
  })

  test('Development Enviroment', () => {
    const config = browsersList(DEVELOPMENT_ENV)
    expect(config).toMatchSnapshot()
  })
})


/**
 PostCSS Configuration Tests
 */
describe('PostCSS Configuration', () => {
  test('Invalid Enviroment', () => {
    const getConfig = () => postCSSConfig(INVALID_ENV)
    expect(getConfig).toThrow()
  })

  test('Production Enviroment', () => {
    const config = postCSSConfig(PRODUCTION_ENV)
    expect(config).toMatchSnapshot()
  })

  test('Development Enviroment', () => {
    const config = postCSSConfig(DEVELOPMENT_ENV)
    expect(config).toMatchSnapshot()
  })
})
