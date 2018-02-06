import React from 'react'
import { render } from 'react-dom'
import DOM from 'youreadydom'

import window from './global'
import App from './containers/App'
import './index.scss'


const main = async () => {
  await DOM()

  render(
    <App />,
    window.document.getElementById('js-root'),
  )
}

main()
