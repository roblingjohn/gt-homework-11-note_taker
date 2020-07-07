const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const notes = fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    console.log(data);
    return data;
})

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
    fs.writeFile("db.json", newNote, function(err, res){
      if(err) throw err;
    })
    res.json(newNote);
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });