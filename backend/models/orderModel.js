const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Order schema
const orderSchema = new Schema({
    orderNumber: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Requires Payment Verification', 'To Ship', 'Shipped', 'Completed'],
        default: 'Requires Payment Verification'
    },
    order: {
        type: [Number],
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerCellNumber: {
        type: [Number], 
        required: true
    },
    customerBillingAdd: {
        type: String,
        required: true
    },
    customerCity: {
        type: String,
        enum: ['Metro Manila', 'Batangas', 'Laguna', 'Cavite']
    },
    customerZip: {
        type: Number,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    personReceiving: {
        type: String, 
        required: true
    },
    personRecievingNum: {
        type: Number, 
        required: true
    }, 
    screenshotOfPayment: {
        type: String, // temporary since wedk what to put pa for images
        required: false, 
    }, 
    paymentReferenceCode: {
        type: Number, 
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)