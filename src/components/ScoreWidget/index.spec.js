import React from 'react'
import { shallow } from 'enzyme'
import ScoreWidget, { Arc, viewBoxSizes } from '.'

jest.mock('../../global.js')


/** number -> Promise<void> */
const delay = ms => new Promise(r => setTimeout(r, ms))


const createArcTestProps = props => ({
  length: 50,
  color: '#ddd',
  width: 'sm',
  easing: 'easeOutBack',
  animationDelay: 0,
  ...props,
})
const createArcWrapper = props => shallow(<Arc {...props} />)


describe('<Arc />', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const props = createArcTestProps()
      createArcWrapper(props)
    })

    describe('Base SVG element', () => {
      it('should be the correct type', () => {
        const props = createArcTestProps()
        const wrapper = createArcWrapper(props)

        const expected = 'svg'
        const actual = wrapper.type()

        expect(actual).toEqual(expected)
      })

      it('should have the correct class', () => {
        const props = createArcTestProps()
        const wrapper = createArcWrapper(props)

        const expected = true
        const actual = wrapper.hasClass('score-widget__arc')

        expect(actual).toEqual(expected)
      })

      it('should have the correct ViewBox', () => {
        const props = createArcTestProps({ width: 'md' })
        const wrapper = createArcWrapper(props)
        const size = viewBoxSizes.md

        const expected = `0 0 ${size} ${size}`
        const actual = wrapper.prop('viewBox')

        expect(actual).toEqual(expected)
      })
    })

    describe('<circle /> Stroke element', () => {
      it('should exist', () => {
        const props = createArcTestProps()
        const wrapper = createArcWrapper(props)

        const expected = 1
        const actual = wrapper.find('circle').length

        expect(actual).toEqual(expected)
      })

      it('should have the correct classes', () => {
        const props = createArcTestProps()
        const wrapper = createArcWrapper(props)
        const classes = [
          'score-widget__arc-stroke',
          `score-widget__arc-stroke--${props.easing}`,
        ]

        classes.forEach(($class) => {
          const expected = true
          const actual = wrapper.find('circle').hasClass($class)

          expect(actual).toEqual(expected)
        })
      })

      it('should have a stroke with the given color', () => {
        const color = '#87d2d3'
        const props = createArcTestProps({ color })
        const wrapper = createArcWrapper(props)

        const expected = color
        const actual = wrapper.find('circle').prop('stroke')

        expect(actual).toEqual(expected)
      })

      describe('Coordinates', () => {
        const props = createArcTestProps()
        const circleElem = createArcWrapper(props).find('circle')
        const size = viewBoxSizes[props.width]

        it('should have the correct center X position', () => {
          const expected = size / 2
          const actual = circleElem.prop('cx')

          expect(actual).toEqual(expected)
        })

        it('should have the correct center Y position', () => {
          const expected = size / 2
          const actual = circleElem.prop('cy')

          expect(actual).toEqual(expected)
        })
      })

      it('should increase the arc stroke as length increase', () => {
        const lengths = [10, 30, 50, 70]
        const strokeLens = lengths.map((length) => {
          const props = createArcTestProps({ length })
          const circleElem = createArcWrapper(props).find('circle')
          const strokeLen = circleElem.prop('strokeDasharray').split(',')[0]

          return parseFloat(strokeLen)
        })

        const expected = [...strokeLens]
        const actual = strokeLens.sort((a, b) => a - b)

        expect(actual).toEqual(expected)
      })

      it('should have the animation delay', () => {
        const props = createArcTestProps()
        const circleElem = createArcWrapper(props).find('circle')

        const expected = `${props.animationDelay}ms`
        const actual = circleElem.prop('style').transitionDelay

        expect(actual).toEqual(expected)
      })
    })
  })
})



const createScoreTestProps = props => ({
  wallpaperImg: 'https://example.com/cat.jpg',
  maxScore: 99,
  color: '#ddd',
  score: 10,
  msg: 'Soaring High',
  ...props,
})
const createScoreWrapper = props => shallow(<ScoreWidget {...props} />)


describe('<ScoreWidget />', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const props = createScoreTestProps()
      createScoreWrapper(props)
    })

    describe('Base element', () => {
      const props = createScoreTestProps()
      const wrapper = createScoreWrapper(props)

      it('should be of type article', () => {
        const expected = 'article'
        const actual = wrapper.type()

        expect(actual).toEqual(expected)
      })

      it('should have the correct class', () => {
        const expected = true
        const actual = wrapper.hasClass('score-widget')

        expect(actual).toEqual(expected)
      })
    })

    it('should have a blurred background effect styles class', () => {
      const props = createScoreTestProps()
      const wrapper = createScoreWrapper(props)

      const expected = 1
      const actual = wrapper.find('.score-widget__bg').length

      expect(actual).toEqual(expected)
    })

    describe('Arc', () => {
      const props = createScoreTestProps()
      const arcElem = createScoreWrapper(props).find(Arc)

      it('should exist', () => {
        const expected = 1
        const actual = arcElem.length

        expect(actual).toEqual(expected)
      })

      it('should initially have a zero length', () => {
        const expected = 0
        const actual = arcElem.prop('length')

        expect(actual).toEqual(expected)
      })

      it('should have the correct color', () => {
        const expected = props.color
        const actual = arcElem.prop('color')

        expect(actual).toEqual(expected)
      })

      describe('Easing', () => {
        it('should have a default easing when no arcEasing prop is given', () => {
          const expected = true
          const actual = 'easing' in arcElem.props()

          expect(actual).toEqual(expected)
        })

        it('should set the correct easing', () => {
          const $props = createScoreTestProps({ arcEasing: 'easeOutExpo' })
          const $arcElem = createScoreWrapper($props).find(Arc)

          const expected = 'easeOutExpo'
          const actual = $arcElem.prop('easing')

          expect(actual).toEqual(expected)
        })
      })

      describe('Animation Delay', () => {
        it('should have a default value of 0 when no animationDelay prop is given', () => {
          const expected = 0
          const actual = arcElem.prop('animationDelay')

          expect(actual).toEqual(expected)
        })

        it('should have the correct animation delay', () => {
          const $props = createScoreTestProps({ arcAnimationDelay: 500 })
          const $arcElem = createScoreWrapper($props).find(Arc)

          const expected = 500
          const actual = $arcElem.prop('animationDelay')

          expect(actual).toEqual(expected)
        })
      })
    })

    describe('Text content', () => {
      const props = createScoreTestProps()
      const wrapper = createScoreWrapper(props)

      it('should contain the score', () => {
        const expected = String(props.score)
        const actual = wrapper.find('.score-widget__score').text()

        expect(actual).toEqual(expected)
      })

      it('should contain the max score', () => {
        const content = wrapper.find('.score-widget__content').text()

        const expected = true
        const actual = content.includes(props.maxScore)

        expect(actual).toEqual(expected)
      })

      it('should contain the message', () => {
        const expected = props.msg
        const actual = wrapper.find('.score-widget__msg').text()

        expect(actual).toEqual(expected)
      })
    })
  })

  describe('Component lifecycle', () => {
    describe('componentDidUpdate', () => {
      /**
       [1]. @TODO: Find a better solution as this is brittle.
       [2]. Wait for request animation frame.
       [3]. Get new rendered output after state change.
       */
      it('should animate the arc. Have a non zero length', async () => {
        expect.assertions(1)

        const props = createScoreTestProps()
        const wrapper = createScoreWrapper(props)

        wrapper.instance().componentDidUpdate() /* [1] */
        await delay(16)                         /* [2] */
        wrapper.update()                        /* [3] */

        const expected = (props.score / props.maxScore) * 100
        const actual = wrapper.find(Arc).prop('length')

        expect(actual).toEqual(expected)
      })
    })
  })
})
