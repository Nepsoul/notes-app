import { useState } from "react";
import Note from "./Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setnewNote] = useState("a new note");

  const addNote = (event) => {
    event.preventDefault();

    let note = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5 ? true : false,
    };
    setNotes([...notes, note]);
    setnewNote(" ");

    console.log("button clicked", event.target);
  };
  const handleNoteChange = (event) => {
    setnewNote(event.target.value);
  };

  return (
    <>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default App;
