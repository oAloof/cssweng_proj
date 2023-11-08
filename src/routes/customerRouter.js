const express = require('express')
const router = express.Router()

const customerController = require('../controllers/customerController')

// GET Homepage
router.get('/', customerController.getHomepage)

module.exports = router