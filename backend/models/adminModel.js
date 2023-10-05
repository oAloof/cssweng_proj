const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Admin Account model
const adminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Admin', adminSchema)