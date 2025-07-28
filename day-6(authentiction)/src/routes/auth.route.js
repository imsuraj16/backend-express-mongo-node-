const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register', async (req, res) => {

    const { username, password } = req.body
    

    const user = await userModel.create({
        username, password
    })

    const token = jwt.sign({id : user._id},process.env.JWT_SECRET)

    res.cookie('token',token)

    res.json({
        msg: 'user created',
        user
    })
})


router.post('/login', async (req, res) => {

    const { username, password } = req.body

    const user = await userModel.findOne({
        username
    })

    if (!user) {
        return res.json({
            msg: 'username not found'
        })
    }

    const userPassword = password === user.password

    if (!userPassword) {
        return res.json({
            msg: 'invalid password'
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.json({
        msg: 'login successfuly'
    })

})





module.exports = router