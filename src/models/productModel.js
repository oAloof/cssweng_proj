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
        type: [String], 
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
    // Listed attribute -- if Listed: product will be added to the list of products for sale
    //                     if unlisted: product will not be added to the list of products for sale
    status: {
        type: String,
        enum: ['Listed', 'Unlisted'],
        default: 'Listed'
    }, 
    type: {
        type: Number, 
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)