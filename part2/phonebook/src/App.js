import { useState } from 'react'

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

const Persons = (props) => {
  return (
    props.persons.map(person =>
      <div key={person.id}>
        {person.name} {person.number}
      </div>
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons);

  const addPhone = (event) => {    
    event.preventDefault()
    const phoneObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    for (var person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        setNewName('')
        setNewNumber('')
        return
      }
    }

    const updatedPersons = persons.concat(phoneObject)
    setPersons(updatedPersons)
    setPersonsToShow(updatedPersons)
    setNewName('')
    setNewNumber('')
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
      <Filter handleSearch={handleSearchChange}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPhone} newName={newName} chgName={handleNameChange} newNumber={newNumber} chgNumber={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App