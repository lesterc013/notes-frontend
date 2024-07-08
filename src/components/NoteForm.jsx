const NoteForm = ({ addNote, newNote, setNewNote }) => {
  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={(event) => {setNewNote(event.target.value)}} 
          />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm