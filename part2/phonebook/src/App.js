import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => <div>filter shown with: <input onChange={props.handleSearch}/></div>

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
    <div>name: <input value={props.newName} onChange={props.chgName} /></div>
    <div>number: <input value={props.newNumber} onChange={props.chgNumber} /></div>
    <div>
      <button type="submit">add</button>
    </div>
    </form>
  )
}

const Notification = ({ message,stylename }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={stylename}>
      {message}
    </div>
  )
}

const Persons = (props) => {
  return (
    props.persons.map(person =>
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={()=>props.del(person.id,person.name)}>delete</button>
      </div>
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [errorMessage, setErrorMessage] = useState(null)
  const [styleName, setstyleName] = useState('messg')

  useEffect(() => {
    personService      
      .getAll()      
      .then(initialPersons => {        
        setPersons(initialPersons)  
        setPersonsToShow(initialPersons)  
      })  
  }, [])

  const addPhone = (event) => {    
    event.preventDefault()
    const phoneObject = {
      name: newName,
      number: newNumber,
    }

    for (var person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        setNewName('')
        setNewNumber('')
        return
      }
    }

    personService      
      .create(phoneObject)      
      .then(returnedNote => {
        const updatedPersons = persons.concat(phoneObject)
        setPersons(updatedPersons)
        setPersonsToShow(updatedPersons)
        setNewName('')
        setNewNumber('')
        setstyleName('messg')
        setErrorMessage(          
          `Added ${phoneObject.name}`        
        )
        setTimeout(() => {          
          setErrorMessage(null)        
        }, 5000)
      })
  }

  const detetePerson = (id,name) => {    
    if (window.confirm(`Delete ${name} ?`)) {
      personService      
      .del(id)    
      .then(response => {  
        console.log(`Deleted user ${name}`) 
        setPersons(persons.filter(person => person.id !== id))
        setPersonsToShow(persons.filter(person => person.id !== id))
      })
      .catch(error => {  
        setstyleName('error')
        setErrorMessage(
          `Information of '${name}' has already been removed from the server`        
        )
        setTimeout(() => {
          setErrorMessage(null)        
        }, 5000)  
      })
    }
  }

  const handleNameChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {    
    console.log(event.target.value)    
    setNewNumber(event.target.value)  
  }

  const handleSearchChange = (event) => {
    const searchtxt = event.target.value
    if (searchtxt !== '') {
      const filtered = persons.filter(person => person.name.toLowerCase().includes(searchtxt.toLowerCase()))
    
      setPersonsToShow(filtered);
    } else {
      setPersonsToShow(persons);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} stylename={styleName}/>
      <Filter handleSearch={handleSearchChange}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPhone} newName={newName} chgName={handleNameChange} newNumber={newNumber} chgNumber={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} del={detetePerson} />
    </div>
  )
}

export default App