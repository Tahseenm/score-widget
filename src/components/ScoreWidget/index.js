import React, { Component } from 'react'
import PropTypes from 'prop-types'
import window from '../../global'

import './styles.scss'


/**
 +----------------------------------------------------------------------------+
 | Helpers                                                                    |
 +----------------------------------------------------------------------------+/

/** number -> number */
const calcCircumference = radius => 2 * Math.PI * radius



/**
 +----------------------------------------------------------------------------+
 | Components                                                                 |
 +----------------------------------------------------------------------------+/

/**
 Create an Arc shape using SVG circle element. Stroke Dash array is used to draw
 the arc and is animated. Circle is a simpler alternative to SVG paths.

 [1]. The smaller the viewbox the larger the stroke of width 1 will appear
 */

const viewBoxSizes = {
  sm: 80,
  md: 60,
  lg: 40,
}

const Arc = ({
  length,
  color,
  width,
  easing,
  animationDelay,
}) => {
  const size = viewBoxSizes[width]  /* [1] */
  const arcWidth = 1

  const radius = (size - arcWidth) / 2
  const circumference = calcCircumference(radius)
  const strokeLen = circumference * (length / 100)

  return (
    <svg
      className="score-widget__arc"
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >

      <circle
        className={`score-widget__arc-stroke score-widget__arc-stroke--${easing}`}
        style={{ transitionDelay: `${animationDelay}ms` }}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={arcWidth}
        strokeDasharray={`${strokeLen}, ${circumference - strokeLen}`}
        strokeLinecap="round"
        strokeDashoffset={circumference / 4}
      />
    </svg>
  )
}

Arc.propTypes = {
  length: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  easing: PropTypes.string.isRequired,
  animationDelay: PropTypes.number.isRequired,
}



class ScoreWidget extends Component {
  static propTypes = {
    arcAnimationDelay: PropTypes.number.isRequired,
    wallpaperImg: PropTypes.string.isRequired,
    arcEasing: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    msg: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  }

  static defaultProps = {
    arcEasing: 'easeOutBack',
    arcAnimationDelay: 0,
    msg: false,
  }

  state = {
    animate: false,
  }

  componentDidUpdate() {
    window.requestAnimationFrame(() => {
      this.setState({ animate: true })
    })
  }

  render() {
    const {
      arcAnimationDelay,
      wallpaperImg,
      arcEasing,
      maxScore,
      color,
      score,
      msg,
    } = this.props

    const arcLen = (score / maxScore) * 100

    return (
      <article className="score-widget">
        <div
          className="score-widget__bg"
          style={{ backgroundImage: `url(${wallpaperImg})` }}
        />

        <Arc
          length={this.state.animate ? arcLen : 0}
          width="sm"
          color={color}
          easing={arcEasing}
          animationDelay={arcAnimationDelay}
        />

        <div className="score-widget__content-wrap">
          <div className="score-widget__content">
            <p className="score-widget__text">Your credit score is</p>
            <p className="score-widget__score" style={{ color }}>{score}</p>
            <p className="score-widget__text">out of <b>{maxScore}</b></p>

            {msg && <p className="score-widget__msg" style={{ color }}>{msg}</p>}
          </div>
        </div>
      </article>
    )
  }
}


export {
  ScoreWidget as default,
  viewBoxSizes,
  Arc,
}
