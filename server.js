const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

const notes = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    notes.push(newNote);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function(err, res){
      if(err) throw err;
    })
    return res.json(newNote);
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });