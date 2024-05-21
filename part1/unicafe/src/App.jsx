import { useState } from 'react';
import Button from './Button';
import Statistics from './Statistics';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (event) => {
    let type = event.target.textContent;
    if (type == 'good') {
      setGood(good + 1)
      console.log(good);
    } else if (type == 'neutral') {
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClick} type={'good'}/><Button handleClick={handleClick} type={'neutral'} /><Button handleClick={handleClick} type={'bad'}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App