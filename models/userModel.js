const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Customer schema
const customerSchema = new Schema({
    username: {
        type: String,
        required: true,
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
        enum: ['Metro Manila', 'Batangas', 'Laguna', 'Cavite'],
        required: false
    },
    email: {
        type: String,
        required: false
    },
    cellNumber: {
        type: [Number], 
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

module.exports = mongoose.model('Customer', customerSchema)