const { urlencoded } = require('express');
const express = require('express');
let notes = require('./db/db.json')
const fs = require('fs')

const PORT = process.env.PORT || 3001;
const path = require('path');
const { notStrictEqual } = require('assert');

const app = express();

app.use(express.json())

app.use(urlencoded({extended: true}));

app.use(express.static('public'));

app.get("/api/notes", (req, res) => {
    return res.json(notes)
});