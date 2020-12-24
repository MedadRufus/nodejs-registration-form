//DEFINIG A MONGOOSE SCHEMA

const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    topic: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        trim: true,
    },

})
module.exports = mongoose.model('Registration', registrationSchema)