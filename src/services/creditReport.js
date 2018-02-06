import window from '../global'


const DASHBOARD_DATA_URI = 'https://s3.amazonaws.com/cdn.clearscore.com/native/interview_test/creditReportInfo.json'

/** () -> Promise<Object> */
const getReport = async () => {
  const response = await window.fetch(DASHBOARD_DATA_URI)

  const {
    creditReportInfo: {
      score,
      maxScoreValue: maxScore,
    },
  } = await response.json()

  return {
    score,
    maxScore,
  }
}


export {
  DASHBOARD_DATA_URI,
  getReport,
}
