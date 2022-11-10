// dependencies
const { urlencoded } = require("express");
const express = require("express");
let notes = require("./db/db.json");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const path = require("path");
const { notStrictEqual } = require("assert");

const app = express();

app.use(express.json());

app.use(urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
  return res.json(notes);
});

app.post("/api/notes", (req, res) => {
  let newNote = { title: req.body.title, text: req.body.text };
  let dbNotes = notes;
  dbNotes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(dbNotes));
  res.json(newNote);
});
// order here does matter and we want this to come first becuase * will catch any URL.if not the default will be the app.get 
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => console.log(`Express listening on port ${PORT}`));
