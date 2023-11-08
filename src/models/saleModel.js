const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Sale schema
const saleSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    location: {
        type: String,
        enum: ['Metro Manila', 'Batangas', 'Laguna', 'Cavite'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }, 
    endTime: {
        type: String,
        required: true
    }, 
    saleList: { // blackList
        type: Map,
        of: Number, 
        required: true
    }
})

module.exports = mongoose.model('Sale', saleSchema)