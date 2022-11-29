import { useState, useEffect, useRef } from "react";
//import axios from "axios";
import noteService from "./services/notes";

import Note from "./components/Note";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import loginService from "./services/login";

const App = () => {
  const noteFormRef = useRef();
  //1.we need to get data from server
  //2.const [notes, setNotes] = useState([]) this source will be the data we get from server

  /*Things we need to setup
    1.backend server: will create fake backend server
    2.in the frontend code, read the data from backend server
     2.1 npm library that provides technology to call backend server
     2.2 where and how to call this library from react code
   */

  const [notes, setNotes] = useState([]);
  // const [newNote, setnewNote] = useState("a new note");
  const [showAll, setshowAll] = useState(true);
  const [message, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((response) => {
      //console.log(typeof response.data);
      setNotes(response);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      noteFormRef.current.toggleVisibility();
    });
  };

  // const addNote = (event) => {
  //   event.preventDefault();

  //   let noto = {
  //     //id: notes.length + 1,
  //     content: newNote,
  //     date: new Date().toISOString(),
  //     important: Math.random() < 0.5 ? true : false,
  //   };

  //   noteService
  //     .create(noto)
  //     .then((response) => {
  //       console.log(response);
  //       setNotes(notes.concat(response));
  //       //console.log(response.data, "i am response data");
  //       console.log(response, "response");
  //       setnewNote("");
  //     })
  //     .catch((error) => {
  //       console.log("this is error");
  //       console.dir(error);
  //       setErrorMessage(error.response.data.error);
  //       setTimeout(() => {
  //         setErrorMessage("");
  //       }, 5000);
  //     });
  // };

  // const handleNoteChange = (event) => {
  //   setnewNote(event.target.value);
  // };

  const random = () => setshowAll(!showAll);

  const notesToShow = showAll
    ? notes
    : notes.filter((tog) => tog.important === true);

  // const handleLogin = (event) => {
  //   event.preventDefault();
  //   console.log("logging in with", username, password);
  // };
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      noteService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="show me login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );

  return (
    <div>
      <h1>Heroku Notes full deploy</h1>
      <Notification message={message} />

      {/* {loginFrom()} */}
      {/* {user === null ? loginForm() : noteForm()} */}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      )}

      {/* </><button onClick={() => setshowAll(!showAll)}> */}
      <button onClick={random}>show {showAll ? "All" : "Important"}</button>
      <ul>
        {notesToShow.map((notex) => (
          <Note
            key={notex.id}
            note={notex}
            toggleImportance={() => {
              //toggleImportanceOf(note.id)

              // console.log(
              //   `button is clicked by function passed from API for id ${notex.id}`
              // );
              //1.make new object from current note with toggled importand field
              const updatedNote = { ...notex, important: !notex.important };
              //2.update backend server with the updated object
              //axios.put(`http://localhost:3001/notes/${notex.id}`, updatedNote)
              noteService
                .update(notex.id, updatedNote)
                .then((response) => {
                  console.log(response);
                  //3.now, also update the frontend state with the updated note
                  setNotes(
                    notes.map((x) => (x.id !== notex.id ? x : response))
                  );
                  // setnewNote("");
                })
                .catch((error) => {
                  console.log("caught the error");
                  setErrorMessage("Note does not exisit anymore");
                  setTimeout(() => setErrorMessage(null), 2000);
                  setNotes(notes.filter((x) => x.id !== notes.id));
                });
            }}
          />
        ))}
      </ul>
      {/* <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">submit</button>
      </form> */}
      <Footer />
    </div>
  );
};

export default App;
