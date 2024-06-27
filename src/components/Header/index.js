import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  return (
    <nav>
      <div className="header-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dhxwa9van/image/upload/v1719465374/Group_8005_gxappd.png"
            alt="login website logo"
            className="logo"
          />
        </Link>
        <button type="button" className="logout-btn" onClick={onClickLogoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header
