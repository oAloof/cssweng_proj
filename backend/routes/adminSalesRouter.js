// import necessary node_modules
const express = require('express')
const router = express.Router()

const salesController = require('../controllers/adminSalesController')
const { authenticate, isAdmin } = require('../middlewares/authenticate')

// GET all sales
router.get('/getSales', salesController.getSales) //authenticate, isAdmin,


// POST a new product
router.post('/addSales', salesController.addSales)        

// // DELETE a product
// router.delete('/delete/:id', productController.deleteProduct)

// // GET a single product
// router.get('/:id', productController.singleProductView)

// // GET the update product page
// router.get('/edit/:id', productController.updateProductView)

// // UPDATE a product
// router.patch('/edit/:id', productController.updateProduct) 

// export the router
module.exports = router