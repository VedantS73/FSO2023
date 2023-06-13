import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
  {text}
  </button>
  )

const StatisticLine = (props) => (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )

const Statistics = (props) => {
  if (props.all === 0) {
    return(
      <>
      <h1>statistics</h1>
      <div>
        No feedback given
      </div>
      </>
    )
  }
  return (
    <>
    <h1>statistics</h1>
    <table>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.all} />
      <StatisticLine text="average" value ={(props.good-props.bad)/props.all} />
      <StatisticLine text="positive" value ={(props.good*100)/props.all} />
    </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const goodFeedback = () => {    
    const updatedgood = good + 1
    setGood(updatedgood)
    setAll(updatedgood + neutral + bad)
  }

  const neutralFeedback = () => {    
    const updatedneutral = neutral + 1
    setNeutral(updatedneutral)
    setAll(good + updatedneutral + bad)
  }

  const badFeedback = () => {    
    const updatedbad = bad + 1
    setBad(updatedbad)
    setAll(good + neutral + updatedbad)
  }

  return (
    <>
    <h1>give feedback</h1>
    <div>
      <Button handleClick={goodFeedback} text='good' />
      <Button handleClick={neutralFeedback} text='neutral' />
      <Button handleClick={badFeedback} text='bad' />
    </div>
    <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </>
  )
}

export default App