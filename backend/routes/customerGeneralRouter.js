const express = require('express')
const router = express.Router()

const generalController = require('../controllers/customerGeneralController')

// GET listed products
router.get('/products', generalController.getProducts)

router.get('/categories', generalController.getProductCategories)


module.exports = router