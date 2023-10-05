const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Product schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        // required: true // could be required?
        default: 'Generic' // comment out if required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    status: {
        type: String,
        enum: ['Listed', 'Unlisted'],
        default: 'Listed'
    }
})

module.exports = mongoose.model('Product', productSchema)