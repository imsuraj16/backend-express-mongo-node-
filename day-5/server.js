const express = require('express')
const connectToDB = require('./src/db/db')
const noteModel = require('./src/models/note.model')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())
connectToDB()



app.post('/notes', async (req, res) => {

    const { title, desc } = req.body

    await noteModel.create({
        title, desc
    })

    res.json({
        msg: 'created'
    })
})


app.get('/notes', async (req, res) => {

    const notes = await noteModel.find()

    res.json({
        msg: 'fetched all notes',
        notes
    })

})


app.delete('/notes/:id', async (req, res) => {

    const { id } = req.params
    
    await noteModel.findOneAndDelete({
        _id: id
    })

    res.json({

        msg: 'note deleted'
    })
})


app.patch('/notes/:id', async (req, res) => {

    const { params: { id }, body: { title, desc } } = req

    await noteModel.findOneAndUpdate({
        _id: id
    }, {
        title: title,
        desc: desc
    })

    res.json({

        msg: 'note updated'
    })
})




app.listen(3000, () => {
    console.log('server is running');

})