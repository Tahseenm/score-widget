import { getReport, DASHBOARD_DATA_URI } from './creditReport'
import window from '../global'
import { isPromise, isPlainObject } from '../utils'

jest.mock('../global.js')


const {
  fetch,
} = window

describe('getReport()', () => {
  const mockReport = {
    creditReportInfo: {
      score: 100,
      maxScoreValue: 1000,
      foo: 10,
      bar: 25,
    },
  }

  beforeEach(() => {
    fetch.mockResponse(JSON.stringify(mockReport))
  })

  afterEach(() => {
    fetch.resetMocks()
  })


  it('should return a Promise', () => {
    const result = getReport()

    const expected = true
    const actual = isPromise(result)

    expect(actual).toEqual(expected)
  })

  it('should make a request to the correct Endpoint', () => {
    getReport()

    const expected = DASHBOARD_DATA_URI
    const actual = fetch.mock.calls[0][0]

    expect(actual).toEqual(expected)
  })

  describe('Resolved Promise', () => {
    it('should be a plain object', async () => {
      expect.assertions(1)
      const result = await getReport()

      const expected = true
      const actual = isPlainObject(result)

      expect(actual).toEqual(expected)
    })

    it('should have score and maxScore properties', async () => {
      expect.assertions(1)

      const expected = ['score', 'maxScore']
      const actual = Object.keys(await getReport())

      expect(actual).toEqual(expected)
    })

    it('should have the correct score and maxScore from the server response', async () => {
      expect.assertions(1)

      const expected = {
        score: mockReport.creditReportInfo.score,
        maxScore: mockReport.creditReportInfo.maxScoreValue,
      }

      const actual = await getReport()

      expect(actual).toEqual(expected)
    })
  })
})
