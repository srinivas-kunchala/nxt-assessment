import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Assessment = () => {
  const [status, setStatus] = useState(apiStatusConstants.initial)

  useEffect(() => {
    const getAssessmentList = async () => {
      setStatus(apiStatusConstants.inProgress)
      const token = Cookies.get('jwt_token')

      const options = {
        method: 'GET',
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
      const response = await fetch(
        'https://apis.ccbp.in/assess/questions',
        options,
      )
      const data = await response.json()
      console.log(data)
    }

    getAssessmentList()
  }, [])

  return <div>testing</div>
}

export default Assessment
