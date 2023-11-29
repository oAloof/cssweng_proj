const express = require('express')
const router = express.Router()
const { authenticate } = require('../middlewares/authenticate')
const upload = require('../middlewares/fileUpload')

const orderController = require('../controllers/adminOrdersController')

// POST new order
router.post('/checkout', authenticate, upload.uploadImage.any(), orderController.addOrder)

module.exports = router