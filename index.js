const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    title: 'Suscripción a Midudev',
    body: 'Me tengo que suscribir al canal de youtube de midudev y twitch'
  },
  {
    id: 2,
    title: 'Frontend Roadmap',
    body: 'Aprender las tecnologías del lado del cliente que hacen posible la creación de interfaces'
  },
  {
    id: 3,
    title: 'Backend Roadmap',
    body: 'Aprender API REST y Nodejs'
  }
]

// Hello world"
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// Get all notes
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// Get note by id
app.get('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const note = notes.find(item => item.id === id)

  if (!note) return res.status(404).send('The note was not found')
  return res.json(note)
})

// Create new note
app.post('/api/notes', (req, res) => {
  const note = req.body

  const ids = notes.map(item => item.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    title: note.title,
    body: note.body
  }

  notes = [...notes, newNote]
  return res.status(201).json(newNote)
})

// Delete note by id
app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const note = notes.find(item => item.id === id)
  if (!note) return res.status(404).send('The client with the given id was not found')

  const index = notes.indexOf(note)
  notes.splice(index, 1)
  return res.json({
    message: 'The client was deleted successfully',
    note
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
