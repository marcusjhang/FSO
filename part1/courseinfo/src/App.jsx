import Header from './Header';
import Content from './Content';
import Total from './Total';
import Part from './Part';

const App = () => {
  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10, 7, 14]

  return (
    <div>
      <Part part={parts[0]} exercise={exercises[0]}/>
      <Part part={parts[1]} exercise={exercises[1]}/>
      <Part part={parts[2]} exercise={exercises[2]}/>
    </div>
  )
}

export default App