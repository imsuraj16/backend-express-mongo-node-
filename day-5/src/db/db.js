const mongoose = require('mongoose')


function connectToDB() {

    mongoose.connect('mongodb+srv://imsuraj:oXFbteaOiAqEvZMh@cluster0.8cvlhox.mongodb.net/cohort')
        .then(() => {
            console.log('DB connected');

        })
}


module.exports = connectToDB