// import necessary node_modules
const express = require('express')
const router = express.Router()

const orderController = require('../controllers/adminOrderController')
const { authenticate, isAdmin } = require('../middlewares/authenticate')

// GET all sales
router.get('/getOrders', orderController.getOrders) //authenticate, isAdmin

router.get('/user/:id', orderController.getUser);


// export the router
module.exports = router