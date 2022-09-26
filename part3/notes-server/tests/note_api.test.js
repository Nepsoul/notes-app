const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

const Note = require("../models/note");

// const initialNotes = [
//   {
//     content: "HTML is easy",
//     date: new Date(),
//     important: false,
//   },
//   {
//     content: "Browser can execute only Javascript",
//     date: new Date(),
//     important: true,
//   },
// ];

beforeEach(async () => {
  //beforeEach function provided by jest library, which runs before test
  await Note.deleteMany({});
  const noteObjects = helper.initialNotes.map((note) => new Note(note));
  const promiseArray = noteObjects.map((note) => note.save());
  await Promise.all(promiseArray);

  // await Note.deleteMany({});
  // let noteObject = new Note(helper.initialNotes[0]);
  // await noteObject.save();
  // noteObject = new Note(helper.initialNotes[1]);
  // await noteObject.save();
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

  expect(response.body).toHaveLength(helper.initialNotes.length); //(response.body=>array), toHaveLength: jest method, checks length
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);
  expect(contents).toContain("Browser can execute only Javascript");
});

test("a valid note can be added", async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const notesAtEnd = await helper.notesInDb();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

  const contents = notesAtEnd.map((n) => n.content);

  // const response = await api.get("/api/notes");
  // const contents = response.body.map((r) => r.content);
  // expect(response.body).toHaveLength(helper.initialNotes.length + 1);

  expect(contents).toContain("async/await simplifies making async calls");
});

test("note without content is not added", async () => {
  //adding another test
  const newNote = {
    important: true,
  };

  await api.post("/api/notes").send(newNote).expect(400);

  const response = await api.get("/api/notes");

  expect(response.body).toHaveLength(helper.initialNotes.length);
});

afterAll(() => {
  mongoose.connection.close();
});
