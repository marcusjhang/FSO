import { useState, useEffect } from 'react'
import Names from './components/Names'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nextId, setNextId] = useState(5);
  const [filter, setFilter] = useState('')

  useEffect(() => { // fetch data from server
    personService.getAll()
      .then(persons => {
        console.log(persons)
        setPersons(persons)
        const maxId = Math.max(...persons.map(person => person.id), 0)
        setNextId(maxId + 1)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    const nameObject = {
      id: nextId,
      name: newName,
      number: newNumber
    }

    personService
      .create(nameObject)
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    setNextId(nextId + 1)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleFilterChange} />
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <Names persons={filteredPersons} />
    </div>
  )
}

export default App