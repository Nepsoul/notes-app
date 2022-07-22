import { useState, useEffect } from "react";
import axios from "axios";
import noteService from "./services/notes";

import Note from "./Note";
import getAll from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setnewNote] = useState("a new note");
  const [showAll, setshowAll] = useState(true);

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote).then((response) => {
      setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    });

    // axios.put(url, changedNote).then((response) => {
    //   setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    // });
    console.log(`importance of ${id} needs to be toggled`);
  };

  useEffect(() => {
    noteService.getAll().then((response) => {
      setNotes(response.data);
    });
    // axios.get("http://localhost:3001/notes").then((Response) => {
    //   setNotes(Response.data);
    //   console.log(Response);
    //});
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    let note = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5 ? true : false,
    };
    // console.log("button clicked", event.target);
    // setNotes([...notes, note]);
    // setnewNote(" ");

    noteService.create(note).then((response) => {
      setNotes(notes.concat(response.data));
      setnewNote(" ");
    });

    // axios.post("http://localhost:3001/notes", note).then((Response) => {
    //   console.log(Response.data);
    //   setNotes([...notes, Response.data]);
    //   setnewNote(" ");
    // });
  };

  const handleNoteChange = (event) => {
    setnewNote(event.target.value);
  };

  const random = () => setshowAll(!showAll);

  const notesToShow = showAll
    ? notes
    : notes.filter((tog) => tog.important === true);

  return (
    <>
      <h1>Notes</h1>
      {/* </><button onClick={() => setshowAll(!showAll)}> */}
      <button onClick={random}>show {showAll ? "All" : "Important"}</button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
