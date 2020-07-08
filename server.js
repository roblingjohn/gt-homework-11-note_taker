const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

const notes = require("./db/db.json");
// const indexJS = require(__dirname + "/public/assets/js/index.js");

let idConstant = 1;

const giveIDs = function(){
for(i = 0; i < notes.length; i++){
  notes[i].id = idConstant + i;
  }
}

giveIDs();

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

app.get("/api/notes/:id", function(req, res){
  for(i = 0; i < notes.length; i++){
    if(notes[i].id === i){
      id = notes[i].id;
    }
  }
})

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    notes.push(newNote);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function(err, res){
      if(err) throw err;
    })
    giveIDs();
    return res.json(newNote);
})

app.delete("/api/notes/:id", function(req, res){
  const value = req.params.id - 1
  console.log(value)
  notes.splice(value, 1)
  fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function(err, res){
    if(err) throw err;
  })
  giveIDs();
  res.json(notes);
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });