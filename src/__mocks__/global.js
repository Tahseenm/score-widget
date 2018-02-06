/* eslint import/no-extraneous-dependencies: 0 */
import fetch from 'jest-fetch-mock'


const requestAnimationFrame = cb => setTimeout(cb, 0)

const window = {
  fetch,
  requestAnimationFrame,
}


export default window
