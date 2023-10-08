const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Customer = require('../models/customerModel')

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
    customer: { // idk if correct
        type: Schema.Types.ObjectId, 
        ref: 'Customer', 
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

module.exports = mongoose.model('Order', orderSchema)