import React from 'react'
import { shallow } from 'enzyme'
import Dashboard, { BG_IMG } from '.'
import ScoreWidget from '../ScoreWidget'

jest.mock('../../global.js')


const createTestProps = () => ({ score: 10, maxScore: 100 })
const createWrapper = () => shallow(<Dashboard {...createTestProps()} />)


describe('<Dashboard />', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      createWrapper()
    })

    describe('Base element', () => {
      it('should be the correct element', () => {
        const wrapper = createWrapper()

        const expected = 'main'
        const actual = wrapper.type()

        expect(actual).toEqual(expected)
      })

      it('should have the correct classes', () => {
        const wrapper = createWrapper()
        const classes = ['dashboard', 'dashboard--bg-img']

        classes.forEach(($class) => {
          const expected = true
          const actual = wrapper.hasClass($class)

          expect(actual).toEqual(expected)
        })
      })

      it('should have the correct background image', () => {
        const wrapper = createWrapper()

        const expected = `url(${BG_IMG})`
        const actual = wrapper.prop('style').backgroundImage

        expect(actual).toEqual(expected)
      })
    })

    describe('ScoreWidget', () => {
      it('should exist', () => {
        const wrapper = createWrapper()

        const expected = 1
        const actual = wrapper.find(ScoreWidget).length

        expect(actual).toEqual(expected)
      })

      describe('props', () => {
        it('should have the correct score', () => {
          const { score } = createTestProps()
          const wrapper = createWrapper()

          const expected = score
          const actual = wrapper.find(ScoreWidget).prop('score')

          expect(actual).toEqual(expected)
        })

        it('should have the correct maxScore', () => {
          const { maxScore } = createTestProps()
          const wrapper = createWrapper()

          const expected = maxScore
          const actual = wrapper.find(ScoreWidget).prop('maxScore')

          expect(actual).toEqual(expected)
        })

        it('should have wallpaperImg with the same image url as Dashboard background Image', () => {
          const wrapper = createWrapper()
          const dashboardImg = wrapper.prop('style').backgroundImage.slice(4, -1)

          const expected = dashboardImg
          const actual = wrapper.find(ScoreWidget).prop('wallpaperImg')

          expect(actual).toEqual(expected)
        })
      })
    })
  })
})
