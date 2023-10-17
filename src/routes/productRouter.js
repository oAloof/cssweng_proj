// import necessary node_modules
const express = require('express')
const router = express.Router()

const Product = require('../../models/productModel')
const mongoose = require('mongoose')

// GET all products
router.get('/', async (req, res) => {
    try {
        // const products = await Product.find({}) // find all products
        // res.send(products)
        res.render('allProductsView')
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

// GET the add product page
router.get('/add', (req, res) => {
    res.render('addProduct')
})

// POST a new product
router.post('/add', async (req, res) => {
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
})       

// DELETE a product
router.delete('/:id', async (req, res) => {    
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
})

// GET a single product
router.get('/:id', async (req, res) => {
    const objID = '0000' // placeholder -- change to getting the object id from the request
    
    try {
        const product = await Product.findById(objID) // find a single product
        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

// UPDATE a product
router.patch('/:id', async (req, res) => {
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
}) 

// export the router
module.exports = router