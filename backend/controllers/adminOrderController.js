const Orders = require('../models/orderModel');
const User = require('../models/userModel');

const getOrders = async (req, res) => {
    try {
        const sales = await Orders.find({}).sort({createdAt: -1})
        res.status(200).json(sales)
    return
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
        return
    }
}

const getUser = async (req, res) => {
    id = req.params.id
    try {
        const user = await User.findOne({_id: id})
        console.log(user)
        res.status(200).json(user)
    return
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
        return
    }
}

module.exports = {
    getOrders, 
    getUser, 
}
