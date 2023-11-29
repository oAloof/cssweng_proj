const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Order schema
const orderSchema = new Schema({
    orderNumber: {
        type: String,
        required: true, 
        unique: true
    },
    status: {
        type: String,
        enum: ['Payment Verification', 'To Ship', 'Shipped', 'Completed'],
        default: 'Payment Verification'
    },
    order: [{
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
    }],
    totalCost: {
        type: Number,
        required: true
    },
    customer: { 
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
    personRecievingEmail: {
        type: String, 
        required: true
    },
    screenshotOfPayment: {
        type: [String], 
        required: true, 
    }, 
    deliveryAddress: {
        type: String, 
        required: true
    },
    referenceNumber: {
        type: Number, 
        required: true
    }
}, { timestamps: true }); // Enable timestamps

module.exports = mongoose.model('Order', orderSchema)