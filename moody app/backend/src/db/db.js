const mongoose = require('mongoose');


function connectToDB(){

    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('DB connected');
        
    })
}

module.exports = connectToDB;