const mongoose = require('mongoose')

const Product = require('../models/productModel')

// GET Homepage with top products
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

// Get all products 
const getProductList = async (req, res) => {
    try {
        const products = await Product.find({}) 
        res.set('Cache-Control', 'public, max-age=86400')
        res.render('customerViews/productlistCustomer', { products: products })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const getOngoingBodegaSale = async (req, res) => {
    try {
        res.set('Cache-Control', 'public, max-age=86400')
        res.render('customerViews/ongoingbodegasalecustomer')
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    getHomepage,
    getProductList, 
    getOngoingBodegaSale
}