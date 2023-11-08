const mongoose = require('mongoose')

const Order = require('../models/orderModel')

// GET all orders view
const allOrdersView = async (req, res) => {
    try {
        const orders = await Order.find({}) // find all orders
        res.set('Cache-Control', 'public, max-age=86400')
        res.render('adminViews/allOrders')
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    allOrdersView
}