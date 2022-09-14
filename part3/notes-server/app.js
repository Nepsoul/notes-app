const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");

const notesRouter = require("./controllers/notes");
const App = express();

//App.use..... is middleware
App.use(express.static("build"));
App.use(cors());
App.use(express.json());
// App.use(express.json());==> if this place at below the app.use give 'undefined', always place at above the code

App.use(middleware.requestLogger); //middleware imported through middleware.js file

App.use("/notes", notesRouter); //calling notes api via notesRouter

// App.get("/", (request, response) => {
//   response.send(response.someThis);
//   // response.send("<h1>hello world there</h1>");
//   // response.setHeader('Content-Type', 'text/html').send("<h1>hello world</h1>")
// });
// App.get("/notes", (request, response) => {
//   //showing accessed note from database
//   Note.find().then((result) => response.json(result));
// });

// App.get("/notes/:id", (request, response, next) => {
//   //error handling
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (note) {
//         response.json(note);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       next(error);
//     });
// });

// App.delete("/notes/:id", (request, response, next) => {
//   Note.findByIdAndRemove(request.params.id)
//     .then((result) => {
//       response.status(204).end();
//     })
//     .catch((error) => next(error));
// });

// App.post("/notes", (request, response, next) => {
//   const body = request.body;

//   // throwing error while content missing
//   if (body.content === "") {
//     return response.status(400).json({ error: "content missing" });
//   }

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   });

//   note
//     .save()
//     .then((savedNote) => {
//       response.json(savedNote);
//     })
//     .catch((error) => next(error)); //to catch error
// });
// App.put("/notes/:id", (request, response, next) => {
//   const body = request.body;

//   const note = {
//     content: body.content,
//     important: body.important,
//   };

//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then((updatedNote) => {
//       response.json(updatedNote);
//     })
//     .catch((error) => next(error));
// });

App.use(middleware.unknownEndpoint); //no route found error through this middleware

App.use(middleware.errorHandler);
//this has to be last loaded middleware

module.exports = App;
