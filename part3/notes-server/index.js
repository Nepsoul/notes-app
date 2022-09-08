const express = require("express");
const cors = require("cors");

//importing Note from database through env variable
const Note = require("./models/note");

const App = express();

//App.use..... is middleware
App.use(express.static("build"));
App.use(cors());
App.use(express.json());

App.use((request, response, next) => {
  //console.log("middleware");
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  // response.someThis = "hello world";
  next();
});
// App.use(express.json());==> if this place at below the app.use give 'undefined', always place at above the code

App.get("/", (request, response) => {
  response.send(response.someThis);
  // response.send("<h1>hello world there</h1>");
  // response.setHeader('Content-Type', 'text/html').send("<h1>hello world</h1>")
});
App.get("/notes", (request, response) => {
  //showing accessed note from database
  Note.find().then((result) => response.json(result));
  // response.json(notes);
});

App.get("/notes/:id", (request, response) => {
  //   console.log(request.params);
  //   console.log(request.body);

  //error handling
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);

      response.status(400).send({ error: "malformatted id" });
    });
});

App.delete("/notes/:id", (request, response) => {
  const currentId = Number(request.params.id);
  notes = notes.filter((notes) => notes.id !== currentId);
  response.status(204).end();
});
App.post("/notes/", (request, response) => {
  let myIncomingData = request.body;
  myIncomingData.id = notes.length + 1;
  notes.push(myIncomingData);

  //   console.log(request.body);
  console.log(myIncomingData);
  response.status(201).json(myIncomingData);
});

App.use((request, response, next) => {
  response.status(404).send("<h1>No routes found for this request</h1>");
});

//use of default port,if exist otherwise use given port
const PORT = process.env.PORT || "3001";

App.listen(PORT, () => {
  console.log(`server listening ${PORT}`);
});
