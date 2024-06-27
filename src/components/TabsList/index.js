import './index.css'

const TabsList = props => {
  const {tabNumbers, onClickActiveTab} = props

  const clickBtn = () => {
    onClickActiveTab(tabNumbers)
  }

  return (
    <li>
      <button onClick={clickBtn} type="button">
        sample
      </button>
    </li>
  )
}

export default TabsList
