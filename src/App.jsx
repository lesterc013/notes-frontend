import { useState, useEffect } from "react"
// import axios from 'axios'
import Note from "./components/Note"
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import LoginForm from "./components/LoginForm"
import NoteForm from "./components/NoteForm"
import Togglable from "./components/Togglable"
import noteService from './services/notes'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [notes, setNotes] = useState(null) 
    /* 
        - Instead of initialising with [] empty array, it is more correct to use null to set an initial state - since this denotes that there is nothing in the state at the start
        - But problem is on first render, the code below calls map on null which causes a TypeError
        - It is only after rendering that get is called to the db to setNotes
        - Workaround is to conditional render the App that if !notes i.e. if notes is null, then we render null FIRST,
        - After get is called and we setNotes --> this will then render App a second time with all the notes
    */
	const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [loginFormVisible, setLoginFormVisible] = useState(false)

  // To get notes from database
  useEffect(() => {
    const fetchNotes = async () => {
      const initialNotes = await noteService.getAll()
      setNotes(initialNotes)
    }
    fetchNotes()
  }, [])

  // Create new note
  const createNote = async (noteObject) => {
    const returnedNote = await noteService.create(noteObject, user.token)
    setNotes(notes.concat(returnedNote))
  }

  // To check if user is already logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      // If there is a loggedNoteappUser in stringify, then we parse it back and setUser
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  // Want to post the username and password to the /api/login
  // Need to use axios to help us -- create a service
  const handleLogin = async event => {
    event.preventDefault()

    try {
      // Note: Using shorthand property to create a JS object with username: username, password: password
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

	// Note: Shifted this eventhandler to be inline in the Component
  // The event is when input element changes i.e. typed a value
	// The target is the input element
	// Starting to see the relationship between the on<Specific Action> attribute and the prop being passed to the event handlers -- being passed is the event, which the event handler can then use to manipulate things
  // const handleNoteChange = (event) => {
  //   console.log(event.target)
  //   console.log(event.target.value)
  //   setNewNote(event.target.value)
  // }

	const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id)
    const changedNote = {...note, important: !note.important} // Had to create this because if not we need to do note.important = !note.important -- and this is mutating state which should never be done in React. So we create a new note

    // This updates the database
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
      // setNotes
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already deleted from server`
      )
      setTimeout(() => {
        setErrorMessage(null)}, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // Function to render loginForm
  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='login'>          
          <LoginForm 
            username={username} 
            password={password} 
            handleLogin={handleLogin} 
            handleUsernameChange={setUsername} 
            handlePasswordChange={setPassword} 
          />
        </Togglable>
      </div>
    )
  }

  const noteForm = () => {
    return (
      <div>
        <Togglable buttonLabel='new note'>
          <NoteForm 
            createNote={createNote} 
          />
        </Togglable>
      </div>
    )
  }
  
  
  if (!notes) {
    return null
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {
        !user ? 
        loginForm()
        :
        <>
          <p>{user.name} logged in</p>
          {noteForm()}
        </>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? "important" : "all"}
        </button>
      </div>

      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>

      <Footer />

  </div>
  )
}

export default App