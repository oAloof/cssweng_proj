const mongoose = require('mongoose')

const Product = require('../models/productModel')

// GET Homepage
const getHomepage = async (req, res) => {
    try {
        const products = await Product.find({}) // add filter get top Products - 15
        res.set('Cache-Control', 'public, max-age=86400')
        res.render('customerViews/homepage_general', { products: products })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}


module.exports = {
    getHomepage
}