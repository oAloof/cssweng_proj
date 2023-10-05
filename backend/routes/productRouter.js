// Router for requests to /api/products

// import necessary node_modules
const express = require('express')
const router = express.Router()

const Product = require('../models/productModel')
const mongoose = require('mongoose')

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}) // find all products
        res.send(products)
    } catch (err) {
        res.status(500).send(err)
    }
})

// GET a single product
router.get('/:id', (req, res) => {
    res.send('Get a single product') // placeholder
})

// POST a new product
router.post('/', (req, res) => {
    res.send('Post a new product') // placeholder
})

// DELETE a product
router.delete('/:id', (req, res) => {    
    res.send('Delete a product') // placeholder
})

// UPDATE a product
router.patch('/:id', (req, res) => {
    res.send('Update a product') // placeholder
}) 

// export the router
module.exports = router