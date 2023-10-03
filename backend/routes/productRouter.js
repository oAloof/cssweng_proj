// Router for requests to /api/products

// import necessary node_modules
const express = require('express')
const router = express.Router()

// GET all products
router.get('/', (req, res) => {
    res.send('Get all products') // placeholder
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