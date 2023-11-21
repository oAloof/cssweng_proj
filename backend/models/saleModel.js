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
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }, 
    revenue: {
        type: Number, 
        required: true
    }
})

module.exports = mongoose.model('Sale', saleSchema)