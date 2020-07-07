const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const notes = require("./db/db.json");
console.log(notes)

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
    console.log(notes)
    console.log(req.body)
    fs.appendFile(__dirname + "/db/db.json", req.body, function(err, res){
      if(err) throw err;
    })
    return res.json(newNote);
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });