const mongoose = require('mongoose')


const studnetsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    sub: {
        type: String,
        required: true,
    }

})

module.exports = mongoose.model('Students',studnetsSchema)