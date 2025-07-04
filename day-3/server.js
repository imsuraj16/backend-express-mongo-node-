// small notes application

const express = require('express')


const app = express()
app.use(express.json()) // buit-in middleware to read data in req.body

let notes = []


app.post('/', (req, res) => {


    notes.push(req.body)

    res.json({
        message: "notes created successfuly",
        note: req.body
    })
})


app.get('/', (req, res) => {
    res.json(notes)
})


app.delete('/:id', (req, res) => {

    const { id } = req.params
    delete notes[id]


    res.json('note deleted')
})


app.patch('/:id', (req, res) => {

    const { id } = req.params
    const { body } = req

    notes[id] = { ...notes[id], ...body }


    res.json('edited successfully')
})



app.listen(3000, () => {
    console.log('server is running');

})