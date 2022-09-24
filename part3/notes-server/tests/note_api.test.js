const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Note = require("../models/note");

const initialNotes = [
  {
    content: "HTML is easy",
    date: new Date(),
    important: false,
  },
  {
    content: "Browser can execute only Javascript",
    date: new Date(),
    important: true,
  },
];

beforeEach(async () => {
  //this function provided by jest library, it runs before test
  await Note.deleteMany({});
  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});

test("notes are returned as json", async () => {
  //only(test.only :jest method) method run particularly this test only frm this file but frm other files runs all the tests
  //npm test --tests/file name for run one file only from commandline
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/); //regular expression should be between the slash.
});

test("all notes are returned", async () => {
  //adding another test
  const response = await api.get("/api/notes");

  expect(response.body).toHaveLength(initialNotes.length); //(response.body=>array), toHaveLength: jest method, checks length
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);
  expect(contents).toContain("Browser can execute only Javascript");
});

afterAll(() => {
  mongoose.connection.close();
});
