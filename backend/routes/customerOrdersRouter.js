const express = require('express')
const router = express.Router()
const { authenticate } = require('../middlewares/authenticate')
const upload = require('../middlewares/fileUpload')

const orderController = require('../controllers/customerOrdersController')

// POST new order
router.post('/checkout', authenticate, upload.uploadImage.any(), orderController.addOrder)
// GET a specific order
router.get('/:orderNumber', authenticate, orderController.getOrder)

module.exports = router