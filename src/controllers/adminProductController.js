const Product = require('../models/productModel')
const mongoose = require('mongoose')

// GET all products view
const allProductsView = (req, res) => {
    try {
        // const products = await Product.find({}) // find all products
        // res.send(products)
        res.render('adminViews/allProductsView')
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const addProductView = (req, res) => {
    res.render('adminViews/addProduct')
}

const addNewProduct = async (req, res) => {
    // * Try to implement req.body destructuring
    const name = 'Product Name' // placeholder
    const brand = 'Product Brand' // placeholder
    const description = 'Product Description' // placeholder
    const images = ['image1', 'image2', 'image3'] // placeholder
    const quantity = 10 // placeholder
    const price = 100 // placeholder
    const status = 'Listed' // placeholder

    try {
        const product = await Product.create({
            name,
            brand,
            description,
            images,
            quantity,
            price,
            status
        })
        res.send(product)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

const deleteProduct = async (req, res) => {    
    const objID = '0000' // placeholder -- change to getting the object id from the request

    // check if the id is valid
    if (!mongoose.isValidObjectId(objID)) {
        res.status(400).send('Invalid object id')
        return
    }

    // delete the product
    try {
        const product = await Product.findByIdAndDelete({_id: objID})
        console.log(product)
        res.send(product)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

const updateProductView = async (req, res) => {
    const objID = '0000' // placeholder -- change to getting the object id from the request
    
    try {
        const product = await Product.findById(objID) // find a single product
        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const updateProduct = async (req, res) => {
    const objID = '0000' // placeholder -- change to getting the object id from the request
    const name = 'Product Name' // placeholder
    const brand = 'Product Brand' // placeholder
    const description = 'Product Description' // placeholder
    const images = ['image1', 'image2', 'image3'] // placeholder
    const quantity = 10 // placeholder
    const price = 100 // placeholder
    const status = 'Listed' // placeholder

    // check if the id is valid
    if (!mongoose.isValidObjectId(objID)) {
        res.status(400).send('Invalid object id')
        return
    }

    // update the product
    try {
        const product = await Product.findByIdAndUpdate(
            {_id: objID},
            {
                name: name,
                brand: brand,
                description: description,
                images: images,
                quantity: quantity,
                price: price,
                status: status
            },
            { new: true },
        )
        console.log(product)
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
    updateProductView,
    updateProduct
}