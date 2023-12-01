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
        res.status(200).json(user)
    return
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
        return
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const newStatus = req.body.status;

        // Find the order by ID and update its status
        const updatedOrder = await Orders.findByIdAndUpdate(
            orderId,
            { status: newStatus },
            { new: true } // This option returns the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order Status Updated', order: updatedOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
}

module.exports = {
    getOrders, 
    getUser, 
    updateOrderStatus
}
