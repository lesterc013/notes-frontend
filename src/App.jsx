import { useState, useEffect } from "react"
// import axios from 'axios'
import Note from "./components/Note"
import Notification from "./components/Notification";
import noteService from './services/notes'
import './index.css'
import Footer from "./components/Footer";

const App = () => {
    const [notes, setNotes] = useState(null) 
    /* 
        - Instead of initialising with [] empty array, it is more correct to use null to set an initial state - since this denotes that there is nothing in the state at the start
        - But problem is on first render, the code below calls map on null which causes a TypeError
        - It is only after rendering that get is called to the db to setNotes
        - Workaround is to conditional render the App that if !notes i.e. if notes is null, then we render null FIRST,
        - After get is called and we setNotes --> this will then render App a second time with all the notes
    */
    const [newNote, setNewNote] = useState("a new note...")
	const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        noteService.getAll().then(initialNotes => {
            setNotes(initialNotes)
        })
    }, [])
    
	// The event is when form is submitted
	// The target is the form
    const addNote = (event) => {
        event.preventDefault()
		const noteObject = {
			// id: notes.length + 1,
			content: newNote,
			important: Math.random() < 0.5
		}
            noteService
                .create(noteObject)
                .then(returnedNote => {
                    setNotes(notes.concat(returnedNote))
                    setNewNote('')
            })
    }


	// The event is when input element changes i.e. typed a value
	// The target is the input element
	// Starting to see the relationship between the on<Specific Action> attribute and the prop being passed to the event handlers -- being passed is the event, which the event handler can then use to manipulate things
    const handleNoteChange = (event) => {
		console.log(event.target)
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

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

    if (!notes) {
        return null
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
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
            <form onSubmit={addNote}>
                <input 
					value={newNote} 
					onChange={handleNoteChange} 
				/>
                <button type="submit">save</button>
            </form>
            <Footer />
        </div>
    );
};

export default App;
