import { useState, useEffect } from 'react'

import Names from './components/Names'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nextId, setNextId] = useState("4");
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [typeOfNotif, setTypeOfNotif] = useState('success');

  useEffect(() => { // fetch data from server
    personService.getAll()
      .then(persons => {
        console.log(persons)
        setPersons(persons)
        const maxId = Math.max(...persons.map(person => person.id), 0)
        const newId = maxId + 1
        setNextId(String(newId))
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            setNotification(`Updated ${returnedPerson.name}'s number`);
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          })
          .catch(error => {
            console.error('Error updating person:', error);
            setTypeOfNotif('error');
            setNotification(`Information of ${existingPerson.name} has already been removed from server`);
            setTimeout(() => {
              setNotification(null);
            }, 3000);
            setPersons(persons.filter(person => person.id !== existingPerson.id));
          });
      }
    } else {
      const nameObject = {
        id: nextId,
        name: newName,
        number: newNumber
      };

      personService.create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setTypeOfNotif('success');
          setNotification(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 3000);
          const newId = Number(nextId) + 1;
          setNextId(String(newId));
        });
    }
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

  const handleDelete = (id) => {
    personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        console.error('Error deleting person:', error);
      });
  };


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} typeOfNotif={typeOfNotif}/>
      <Filter value={filter} onChange={handleFilterChange} />
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <Names persons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App