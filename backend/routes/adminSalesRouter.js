// import necessary node_modules
const express = require('express')
const router = express.Router()

const salesController = require('../controllers/adminSalesController')

// GET all sales
router.get('/', salesController.allSalesView)
router.get('/add', salesController.addSaleView)
router.post('/add', salesController.addNewSale)
router.post('/add/product', salesController.addNewSale)

// export the router
module.exports = router