const express = require('express')
const router = express.Router()

const customerController = require('../controllers/customerController')

// GET Homepage with top products
router.get('/', customerController.getHomepage)

// Get all products 
router.get('/productlist', customerController.getProductList)

// Get ongoing Bodega Sales
router.get('/ogsales', customerController.getOngoingBodegaSale)
module.exports = router