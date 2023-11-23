const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Customer schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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
    contactNumber: {
        type: Number, 
        required: false
    },
    streetAddress: {
        type: String,
        required: false
    },
    zip: {
        type: Number,
        required: false
    },
    cartItems: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }]
})

module.exports = mongoose.model('User', userSchema)