// import necessary node_modules
const express = require('express')
const router = express.Router()

const productController = require('../controllers/adminProductController')
const upload = require('../middlewares/fileUpload')

// GET all products
router.get('/', productController.allProductsView)

// GET the add product page
router.get('/add', productController.addProductView)

// POST a new product
router.post('/add', upload.uploadImage.any(), productController.addNewProduct)        

// DELETE a product
router.delete('/:id', productController.deleteProduct)

// GET a single product
// router.get('/:id', productController.singleProductView)

// GET the update product page
router.get('/edit/:id', productController.updateProductView)

// UPDATE a product
router.patch('/:id', productController.updateProduct) 

// export the router
module.exports = router