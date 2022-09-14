import { useState, useEffect } from "react";
//import axios from "axios";
import noteService from "./services/notes";

import Note from "./components/Note";
import Footer from "./components/Footer";
import Notification from "./components/Notification";

const App = () => {
  //1.we need to get data from server
  //2.const [notes, setNotes] = useState([]) this source will be the data we get from server

  /*Things we need to setup
    1.backend server: will create fake backend server
    2.in the frontend code, read the data from backend server
     2.1 npm library that provides technology to call backend server
     2.2 where and how to call this library from react code
   */

  const [notes, setNotes] = useState([]);
  const [newNote, setnewNote] = useState("a new note");
  const [showAll, setshowAll] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((response) => {
      console.log(typeof response.data);
      setNotes(response.data);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    let noto = {
      //id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5 ? true : false,
    };

    noteService
      .create(noto)
      .then((response) => {
        setNotes(notes.concat(response.data));
        setnewNote("");
      })
      .catch((error) => {
        console.log("this is error");
        console.dir(error);
        setMessage(error.response.data.error);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
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
      <h1>Heroku Notes full deploy</h1>
      <Notification message={message} />
      {/* </><button onClick={() => setshowAll(!showAll)}> */}
      <button onClick={random}>show {showAll ? "All" : "Important"}</button>
      <ul>
        {notesToShow.map((notex) => (
          <Note
            key={notex.id}
            note={notex}
            toggleImportance={() => {
              //toggleImportanceOf(note.id)

              console.log(
                `button is clicked by function passed from API for id ${notex.id}`
              );
              //1.make new object from current note with toggled importand field
              const updatedNote = { ...notex, important: !notex.important };
              //2.update backend server with the updated object
              //axios.put(`http://localhost:3001/notes/${notex.id}`, updatedNote)
              noteService.update(notex.id, updatedNote).then((response) => {
                console.log(response.data);
                //3.now, also update the frontend state with the updated note
                setNotes(
                  notes.map((x) => (x.id !== notex.id ? x : response.data))
                );
              });
            }}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">submit</button>
      </form>
      <Footer />
    </>
  );
};

export default App;
