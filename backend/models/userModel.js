const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Customer schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType:  {
        type: String,
        enum: ['Customer', 'Admin'],
        required: true
    },
    city: {
        type: String,
        required: false
    },
    cellNumber: {
        type: Number, 
        required: false
    },
    billingAdd: {
        type: String,
        required: false
    },
    zip: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('User', userSchema)