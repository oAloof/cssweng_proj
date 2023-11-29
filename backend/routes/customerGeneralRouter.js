const express = require('express')
const router = express.Router()

const generalController = require('../controllers/customerGeneralController')

// GET listed products

router.get('/categories', generalController.getProductCategories)

router.get('/mostDiscounted', generalController.getMostDiscounted)

router.get('/mostSold', generalController.getMostSold)

router.get('/mostSoldHomepage', generalController.getMostSoldHomepage)

router.get('/newest', generalController.getNewestProducts)

router.get('/brands', generalController.getBrandCategories)


module.exports = router