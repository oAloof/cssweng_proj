// import necessary node_modules
const express = require('express')
const router = express.Router()

const productController = require('../controllers/adminProductsController')
const { authenticate, isAdmin } = require('../middlewares/authenticate')
const upload = require('../middlewares/fileUpload.js')

// GET all products
// router.get('/getProducts', authenticate, isAdmin, productController.getProducts)
router.get('/getProducts', productController.getProducts)

// POST a new product
router.post('/addProduct', upload.uploadImage.any(), productController.addProduct)        

// UPDATE a product
router.patch('/editProduct', upload.uploadImage.any(), productController.editProduct)

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