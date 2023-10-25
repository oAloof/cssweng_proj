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
        default: 'Generic' 
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Temporary
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    availableQuantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number, 
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)