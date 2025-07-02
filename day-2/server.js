const express = require("express")

const app = express()

app.get('/', (req, res) => {
    
//client ka sara data req m aata hai
// when user request data comes in => 
// req.body
// req.query
// req.params

//in dono m hum credentials vala data rakhte hai
// req.headers
// req.cookies


    res.send("Welcome to home page")

    //res use krte hai client k pass data pahuchane m
})

app.get('/profile',(req,res)=>{
    res.send('Welcome to profile page')
})


app.listen(3000, () => {
    console.log('server is running');

})