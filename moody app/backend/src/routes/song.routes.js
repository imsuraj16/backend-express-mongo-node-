const express = require('express')
const multer = require('multer')

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })



//agar form-data se req bhejenge to multer ka use krenge or agar raw format m req bhejenge to express.json() jo pahle se use krte hue a rahe hai

router.post('/songs', upload.single('audio'), (req, res) => {
    console.log(req.body, req.file);


    res.status(201).json({

        msg: 'song created!'
    })
})



module.exports = router