const express = require('express')
const router = express.Router()

const generalController = require('../controllers/customerGeneralController')

// GET listed products

router.get('/categories', generalController.getProductCategories)

router.get('/mostDiscounted', generalController.getMostDiscounted)

router.get('/mostSold', generalController.getMostSold)

router.get('/newest', generalController.getNewestProducts)


module.exports = router