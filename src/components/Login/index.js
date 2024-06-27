import {useState} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrMsg] = useState('')
  const [showErrMsg, setShowErrMsg] = useState(false)
  const [isShowPassword, setShowPassword] = useState(false)

  const successSubmit = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = props
    history.replace('/')
  }

  const submitFailure = err => {
    setErrMsg(err)
    setShowErrMsg(previousState => !previousState)
  }

  const onClickSubmitBtn = async event => {
    event.preventDefault()

    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      successSubmit(data.jwt_token)
    } else {
      submitFailure(data.error_msg)
    }
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onShowPassword = () => {
    setShowPassword(previousState => !previousState)
  }

  const getToken = Cookies.get('jwt_token')

  console.log(getToken)

  if (getToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="main-login-container">
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dhxwa9van/image/upload/v1719465374/Group_8005_gxappd.png"
          alt="login website logo"
          className="logo"
        />
        <form onSubmit={onClickSubmitBtn}>
          <div className="input-container">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input"
              id="username"
              type="text"
              placeholder="Username"
              onChange={onChangeUsername}
              value={username}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input"
              id="password"
              type={isShowPassword ? password : 'password'}
              placeholder="Password"
              onChange={onChangePassword}
              value={password}
            />
          </div>
          <div className="checkbox-container">
            <input
              id="show"
              type="checkbox"
              className="checkbox"
              onChange={onShowPassword}
              value={isShowPassword}
            />
            <label htmlFor="show">Show Password</label>
          </div>

          <div className="btn-container">
            <button className="btn-element" type="submit">
              Login
            </button>
          </div>
          {showErrMsg && <p>{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
