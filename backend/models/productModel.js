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
        // required: true // ! require later
    },
    images: {
        type: [String], 
        required: true
    },
    availableQuantity: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number, 
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true 
    },
    // Listed attribute -- if true: product will be added to the list of products for sale
    //                     if false: product will not be added to the list of products for sale
    listProduct: {
        type: Boolean,
        default: false,
        required: true
    },
    category: {
        type: [String], 
        required: true
    }
}, { timestamps: true }); // Enable timestamps

module.exports = mongoose.model('Product', productSchema)