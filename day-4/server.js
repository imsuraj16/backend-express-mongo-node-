const express = require('express')
const cors = require('cors')
const connectToDB = require('./src/db/db')
connectToDB()

const app = express()

app.use(express.json())
app.use(cors())

let notes = []

app.post('/', (req, res) => {

    let { body } = req
    notes.push(body)

    res.json({
        msg: "note created",
        note: body
    })

})


app.get('/', (req, res) => {

    res.json(notes)
})

app.patch('/:id', (req, res) => {

    let { body, params: { id } } = req
    const index = notes.findIndex(note => note.id === id);
    
    notes[index] = { ...notes[index], ...body }

    res.json({
        msg: 'edited'
    })
})



app.delete('/:id', (req, res) => {

    const { params: { id } } = req
    const index = notes.findIndex(note => note.id === id);
    // delete notes[index]
    notes.splice(index,1)

    res.json({
        msg : "note deleted"
    })
})








app.listen(3000, () => {
    console.log('server in running');

})