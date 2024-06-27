import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import Questions from '../Questions'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Assessment = () => {
  const [apiStatus, setApiStatus] = useState({
    status: apiStatusConstants.initial,
    data: [],
  })

  useEffect(() => {
    const getAssessmentList = async () => {
      setApiStatus(previousState => ({
        ...previousState,
        status: apiStatusConstants.inProgress,
      }))

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

      if (response.ok) {
        const updatedData = data.questions.map(eachItem => ({
          id: eachItem.id,
          options: eachItem.options.map(each => ({
            id: each.id,
            imageUrl: each.image_url,
            isCorrect: each.is_correct,
            text: each.text,
          })),
          optionType: eachItem.options_type,
          questionText: eachItem.question_text,
        }))

        setApiStatus(previousState => ({
          ...previousState,
          status: apiStatusConstants.success,
          data: updatedData,
        }))
      } else {
        setApiStatus(previousState => ({
          ...previousState,
          status: apiStatusConstants.failure,
        }))
      }
    }

    getAssessmentList()
  }, [])

  const retryBtn = () => {}
  const renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dhxwa9van/image/upload/v1719477296/Group_7519_uynraq.png"
        alt="failure"
        className="failure"
      />
      <h1>Oops! Something went wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" onClick={retryBtn}>
        Retry
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  )

  const renderSuccessView = () => {
    const {data} = apiStatus

    return <Questions questionDetails={data} />
  }

  const renderFinalView = () => {
    const {status} = apiStatus

    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()

      case apiStatusConstants.success:
        return renderSuccessView()

      case apiStatusConstants.failure:
        return renderFailureView()

      default:
        return null
    }
  }

  return (
    <div>
      <Header />
      {renderFinalView()}
    </div>
  )
}

export default Assessment
