// Dependencies
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
// handles data parsing
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());
// starts in public when looking for something
app.use(express.static(path.join(__dirname + "/public")));

// order here matters so always have the api-route before the html-routes since the data must display on to the html pages
require("/routes/api-routes.js")(app);

require("/routes/html-routes.js")(app);

app.listen(PORT, function() {
    console.log('App listening on PORT: ' + PORT)
})