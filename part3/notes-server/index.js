const express = require("express");
const cors = require("cors");

const App = express();
App.use(cors());

let notes = [
  {
    id: 1,
    content: "HTML is easy at same time hard",
    date: "2022-1-17T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2022-1-17T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-1-17T19:20:14.298Z",
    important: true,
  },
  {
    content: "hey there you are lucky",
    date: "2022-08-06T05:43:27.539Z",
    important: false,
    id: 4,
  },
];

App.get("/", (request, response) => {
  response.send("<h1>hello world there</h1>");
  // response.setHeader('Content-Type', 'text/html').send("<h1>hello world</h1>")
});
App.get("/notes", (request, response) => {
  response.send(notes);
});

App.listen("3001", () => {
  console.log("server listening 3001");
});
