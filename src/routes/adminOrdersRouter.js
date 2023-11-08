const express = require('express')
const router = express.Router()

const orderController = require('../controllers/adminOrdersController')

// GET all orders
router.get('/', orderController.allOrdersView)

module.exports = router