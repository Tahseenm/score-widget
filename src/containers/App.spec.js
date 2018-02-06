import React from 'react'
import { shallow } from 'enzyme'

import App from './App'
import Dashboard from '../components/Dashboard'

jest.mock('../global.js')
jest.mock('../services/creditReport.js')


/** number -> Promise<void> */
const delay = ms => new Promise(r => setTimeout(r, ms))

describe('<App />', () => {
  describe('rendering', () => {
    it('should render the <Dashboard /> component', () => {
      const wrapper = shallow(<App />)

      const expected = 1
      const actual = wrapper.find(Dashboard).length

      expect(actual).toEqual(expected)
    })
  })

  describe('Component lifecycle', () => {
    /** Manual mock data */
    const {
      score,
      maxScore,
    } = require('../services/creditReport.js') // eslint-disable-line global-require

    describe('Mount', () => {
      const mountIt = async (componentWrapper) => {
        componentWrapper.instance().componentDidMount()
        await delay(0)
        componentWrapper.update()

        return componentWrapper
      }

      it('should render Dashboard with score from creditReport service', async () => {
        expect.assertions(1)
        const wrapper = shallow(<App />)

        await mountIt(wrapper)

        const expected = score
        const actual = wrapper.find(Dashboard).prop('score')

        expect(actual).toEqual(expected)
      })

      it('should render Dashboard with maxScore from creditReport service', async () => {
        expect.assertions(1)
        const wrapper = shallow(<App />)

        await mountIt(wrapper)

        const expected = maxScore
        const actual = wrapper.find(Dashboard).prop('maxScore')

        expect(actual).toEqual(expected)
      })
    })
  })
})
