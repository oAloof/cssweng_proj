const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Order schema
const orderSchema = new Schema({
    orderNumber: {
        type: Number,
        required: true, 
        unique: true
    },
    status: {
        type: String,
        enum: ['Payment Verification', 'To Ship', 'Shipped', 'Completed'],
        default: 'Payment Verification'
    },
    order: {
        type: Map,
        of: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    customer: { // idk if correct
        type: Schema.Types.ObjectId, 
        ref: 'User', 
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
        type: String, 
        required: false, 
    }, 
    paymentReferenceCode: {
        type: Number, 
        required: true
    }
})

module.exports = mongoose.model('Order', orderSchema)