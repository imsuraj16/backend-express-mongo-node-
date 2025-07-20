const express = require('express')
const songRoutes = require('./routes/song.routes')
const app = express()
app.use(express.json())
app.use('/',songRoutes) //hum alag folder m ek api bna rahe to express ko pta nhi chalta isliye ye line likhte hai


module.exports = app