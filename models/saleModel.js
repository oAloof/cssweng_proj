const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Sale schema
const saleSchema = new Schema({
    location: {
        type: String,
        enum: ['Metro Manila', 'Batangas', 'Laguna', 'Cavite'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Sale', saleSchema)