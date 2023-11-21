// import necessary node_modules
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()

const salesController = require('../controllers/adminSalesController')
const { authenticate, isAdmin } = require('../middlewares/authenticate')

// GET all sales
router.get('/getSales', salesController.getSales) //authenticate, isAdmin,

// POST a new product
router.post('/addSales', upload.any(), salesController.addSales)        

// // DELETE a product
router.delete('/:id', salesController.deleteSales)

// // GET a single product
// router.get('/:id', productController.singleProductView)

// // GET the update product page
// router.get('/edit/:id', productController.updateProductView)

// // EDIT a sale
router.patch('/:id',  upload.any(), salesController.editSale)

// export the router
module.exports = router