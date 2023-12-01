// import necessary node_modules
const express = require('express')
const router = express.Router()

const orderController = require('../controllers/adminOrderController')
const { authenticate, isAdmin } = require('../middlewares/authenticate')

// GET all orders
router.get('/getOrders', orderController.getOrders) //authenticate, isAdmin

router.get('/user/:id', orderController.getUser);

// UPDATE order status
router.put('/update/:orderId', orderController.updateOrderStatus) //authenticate, isAdmin

// export the router
module.exports = router