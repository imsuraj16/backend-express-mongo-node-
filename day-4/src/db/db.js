const mongoose = require('mongoose')


function connectToDB(){

    mongoose.connect('mongodb+srv://imsuraj:oXFbteaOiAqEvZMh@cluster0.8cvlhox.mongodb.net/cohort').then(()=>{
        console.log('connected to db');
        
    })
}


module.exports = connectToDB