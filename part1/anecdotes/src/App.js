import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )

const Mostvoted = (props) => {
  let maxindex = props.votes.indexOf(Math.max(...props.votes))
  return(
    <>
      <p>{props.anecdotes[maxindex]}</p>
      <p>has {props.votes[maxindex]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))

  const nextanecdote = () => {    
    let randint = Math.floor(Math.random() * anecdotes.length)
    setSelected(randint)
  }

  const voteanecdote = () => {    
    const temp = [...vote]
    temp[selected] += 1
    setVote(temp)
  }
  
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <div>
        <Button handleClick={voteanecdote} text='vote'/>
        <Button handleClick={nextanecdote} text='next anecdote'/>
      </div>
      <h1>Anecdote with most votes</h1>
      <Mostvoted anecdotes={anecdotes} votes={vote}/>
    </>
  )
}

export default App