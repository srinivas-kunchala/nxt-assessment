import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div>
      <div className="home-container">
        <div className="instructions-card">
          <h1>Instructions</h1>
          <ol>
            <li>Total Questions: 10</li>
            <li>Types of questions: MCQs</li>
            <li>Duration: 10 Mins</li>
            <li>
              <p>Marking Scheme: Every Correct response, get 1 mark</p>
            </li>
            <li>
              <p>
                All the progress will be lost, if you reload during the
                assessment
              </p>
            </li>
          </ol>
          <Link to="/assessment">
            <button type="button">Start Assessment</button>
          </Link>
        </div>
        <img
          src="https://res.cloudinary.com/dhxwa9van/image/upload/v1719471256/Group_fmm4ap.png"
          alt="assessment"
          className="assessment"
        />
      </div>
    </div>
  </>
)

export default Home
