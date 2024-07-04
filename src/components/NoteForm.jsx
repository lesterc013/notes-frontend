const NoteForm = ({ addNote, newNote, setNewNote }) => {
  return (
    <form onSubmit={addNote}>
      <input 
        value={newNote} 
        onChange={(event) => {setNewNote(event.target.value)}} 
        />
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm