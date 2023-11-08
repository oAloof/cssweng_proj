const mongoose = require('mongoose')

const Product = require('../models/productModel')
const upload = require('../middlewares/fileUpload')
const { deleteFile } = require('../middlewares/fileDelete')

// GET all products view
const allProductsView = async (req, res) => {
    try {
        const products = await Product.find({}) // find all products
        res.set('Cache-Control', 'public, max-age=86400')
        res.render('adminViews/productListAdmin', { products: products })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const addProductView = (req, res) => {
    res.render('adminViews/addProduct_Admin')
}

const addNewProduct = async (req, res) => {
    const { name, brand, price, quantity, description, status } = req.body
    const imageFiles = req.files

    try {
        // Check if the product with the same name and brand already exists
        const result = await Product.find({ name: name, brand: brand })
        if (result.length > 0) {
            res.send('Product already exists')
            return
        }
        // upload the product images to google drive
        let images = []
        try {
            for (let image of imageFiles) {
                const imageId = await upload.uploadFile(image)
                images.push(imageId)
            }
        } catch (err) {
            console.log(err)
            res.send(err)
            return
        }
        
        // Save product into mongoDB
        const product = await Product.create({
            name,
            brand,
            description,
            images,
            quantity,
            price,
            status
        })
        res.status(200).send("Product Added")
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

const deleteProduct = async (req, res) => {    
    const objID = req.body.productId

    // check if the id is valid
    if (!mongoose.isValidObjectId(objID)) {
        res.status(400).send('Invalid object id')
        return
    }
    // Get the fileID of the images of the product
    var images = []
    try {
        const product = await Product.findById(objID)
        images = product.images
        
        for (let image of images) {
            console.log(image)
            await deleteFile(image)
        }

    } catch (err) {
        console.log(err)
    }

    // delete the product
    try {
        const product = await Product.findByIdAndDelete({_id: objID})
        res.send(product)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

const singleProductView = async (req, res) => {

}

const updateProductView = async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.render('adminViews/editProductDetailsAdmin', { product: product })
}

const updateProduct = async (req, res) => {
    const { name, brand, price, quantity, description, status,  productId } = req.body

    // check if the id is valid
    if (!mongoose.isValidObjectId(productId)) {
        res.status(400).send('Invalid product id')
        return
    }

    // update the product
    try {
        const product = await Product.findByIdAndUpdate(
            {_id: productId},
            {
                name: name,
                brand: brand,
                description: description,
                // * Implement image update
                quantity: quantity,
                price: price,
                status: status
            },
            { new: true },
        )
        res.send(product)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

module.exports = {
    allProductsView,
    addProductView,
    addNewProduct,
    deleteProduct,
    singleProductView,
    updateProductView,
    updateProduct
}