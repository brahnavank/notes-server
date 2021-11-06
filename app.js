const express = require('express');
const noteshelper = require('./noteshelper');

const app = express()
const port = 8080

// to read request body json
app.use(express.json());
app.use(express.static(__dirname + '/public'));


//check and create data.json when server starts
noteshelper.checkCreateJsonFile();

app.get('/', (req, res) => {
  let endpoints = 
  '/api/v1/notes\n'+
  '/api/v1/notes/{id}\n'+
  '/api/v1/notes\n'
  res.send("<html>"+
  "<link rel=\"stylesheet\" href=\"/index.css\"><body>"+
  "<div class=\"content\"><div class=\"api\">"
  +"<h1> The API must implement the following route</h1>"
  +"<div class=\"content\">"

  +"<label>GET /notes</label></br>"
  +"<a href=\"/api/v1/notes\" target=\"_blank\">http://localhost:8080/api/v1/notes</a>"
  +"<p>to return a list of all the notes.</p></br>"

  +"<label>GET /notes/{id}</label></br>"
  +"<a href=\"/api/v1/notes/1\" target=\"_blank\">http://localhost:8080/api/v1/notes/1</a>"
  +"<p>to only return the note with `id`={id}</p></br>"

  +"<label>POST /notes</label></br>"
  +"<p href=\"/api/v1/notes\" target=\"_blank\">http://localhost:8080/api/v1/notes</p>"
  +"<p>to return a list of all the notes.</p></br>"


  +"<label>Detele /notes/{id}</label></br>"
  +"<p href=\"/api/v1/notes/1\" target=\"_blank\">http://localhost:8080/api/v1/notes/1</p>"
  +"<p>to return a list of all the notes.</p></br>"

  +"</div>"
  +"</div></div>"
  +"</body></html>");
})

//GET /notes
//to return a list of all the notes.
app.get('/api/v1/notes', (req, res) => {
    res.send(noteshelper.readNotes())
})

//GET /notes/{id}
//to only return the note with `id`={id}
app.get('/api/v1/notes/:id', (req, res) => {
    res.send(noteshelper.readNotesId(req.params.id))
})

//DELETE /notes/{id}
//to only return the note with `id`={id}
app.delete('/api/v1/notes/:id', (req, res) => {
    res.send(noteshelper.deleteNotesId(req.params.id))
})

// POST /notes
// to create a new note.
app.post('/api/v1/notes', (req, res) => {
    res.send(noteshelper.createNotes(req.body));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});