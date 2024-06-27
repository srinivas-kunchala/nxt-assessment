import {useState} from 'react'

import TabsList from '../TabsList'

import './index.css'

const Questions = props => {
  const {questionDetails} = props

  const [activeTab, setNewTab] = useState(questionDetails[0])

  const [count, setCount] = useState(0)

  const onClickActiveTab = id => {
    setNewTab(id)
  }

  const onClickOptionItem = option => {
    console.log(option)
    console.log(option.isCorrect)
    if (option.isCorrect === 'true') {
      setCount(previousState => previousState + 1)
    }
  }

  return (
    <div className="question-and-num-container">
      <div className="question-card">
        <h1>{activeTab.questionText}</h1>
        <hr />
        <div className="option-container">
          <ul className="options">
            {activeTab.options.map(eachItem => (
              <li key={eachItem.id} className="option-items">
                <button
                  type="button"
                  onClick={() => onClickOptionItem(eachItem)}
                >
                  {eachItem.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="tab-card">
        <ol>
          {questionDetails.map(eachItem => (
            <TabsList
              key={eachItem.id}
              tabNumbers={eachItem}
              onClickActiveTab={onClickActiveTab}
            />
          ))}
        </ol>
        <p>{count}</p>
      </div>
    </div>
  )
}

export default Questions
