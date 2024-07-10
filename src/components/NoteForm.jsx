import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  // onSubmit, it will call local addNote function, that will create a note object, to pass into createNote from App which will make the API call
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: true,
    }
    createNote(noteObject)

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(event) => {
            setNewNote(event.target.value)
          }}
          placeholder='write note here'
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default NoteForm
