const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");

const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login"); //for token
const App = express();

//App.use..... is middleware
App.use(express.static("build"));
App.use(cors());
App.use(express.json());
// App.use(express.json());==> if this place at below the app.use give 'undefined', always place at above the code

App.use(middleware.requestLogger); //middleware imported through middleware.js file

App.use("/api/notes", notesRouter); //calling notes api via notesRouter (using api)
App.use("/api/users", usersRouter);
App.use("/api/login", loginRouter); //for token
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  App.use("/api/testing", testingRouter);
}
App.use(middleware.unknownEndpoint); //no route, found error through this middleware

App.use(middleware.errorHandler);
//this has to be last loaded middleware

module.exports = App;
