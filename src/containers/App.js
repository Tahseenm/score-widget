import React, { Component } from 'react'
import Dashboard from '../components/Dashboard'
import { getReport } from '../services/creditReport'


class App extends Component {
  state = {
    score: 0,
    maxScore: 100,
  }

  async updateScore() {
    const {
      score,
      maxScore,
    } = await getReport()

    this.setState({ score, maxScore })
  }

  componentDidMount() {
    this.updateScore()
  }

  render() {
    const {
      score,
      maxScore,
    } = this.state

    return <Dashboard score={score} maxScore={maxScore} />
  }
}


export default App
