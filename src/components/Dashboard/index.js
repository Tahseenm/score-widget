import React from 'react'
import PropTypes from 'prop-types'
import ScoreWidget from '../ScoreWidget'

import './styles.scss'


const BG_IMG = 'https://s9.postimg.org/51sepi54f/background.png'

const Dashboard = ({ score, maxScore }) => (
  <main
    role="main"
    className="dashboard dashboard--bg-img"
    style={{ backgroundImage: `url(${BG_IMG})` }}
  >
    <ScoreWidget
      score={score}
      maxScore={maxScore}
      msg="Soaring high"
      color="#87d2d3"
      wallpaperImg={BG_IMG}
      arcAnimationDelay={550}
    />
  </main>
)

Dashboard.propTypes = {
  score: PropTypes.number.isRequired,
  maxScore: PropTypes.number.isRequired,
}


export {
  Dashboard as default,
  BG_IMG,
}
