const Products = require('../models/productModel');

const getProductCategories = async (req, res) => {
    try {
        const products = await Products.find({})
        var categories = []
        for (var i = 0 ; i < products.length; i++) {
            for (var j = 0 ; j < products[i].category.length; j++) {
                categories.push(products[i].category[j])
            }
        }

        let unique = categories.filter((item, i, ar) => ar.indexOf(item) === i);
        
        res.status(200).json(unique)
    return
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
        return
    }
}

const getBrandCategories = async (req, res) => {
    try {
        const products = await Products.find({})
        var brands = []
        for (var i = 0 ; i < products.length; i++) {
            brands.push(products[i].brand)
        }

        let unique = brands.filter((item, i, ar) => ar.indexOf(item) === i);
        
        res.status(200).json(unique)
    return
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
        return
    }
}

const getMostDiscounted = async (req, res) => {
    try {
        const products = await Products.find({listProduct: true, discountPercentage: { $gte: 20} }).sort({discountPercentage: -1})
        res.status(200).json(products)
    return
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
        return
    }
}

const getMostSold = async (req, res) => {
    try {
        const products = await Products.find({listProduct: true}).sort({quantitySold: -1})
        res.status(200).json(products)
    return
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
        return
    }
}

const getMostSoldHomepage = async (req, res) => {
    try {
        const products = await Products.find({listProduct: true, quantitySold: {$gte: 1}}).sort({quantitySold: -1})
        res.status(200).json(products)
    return
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
        return
    }
}

const getNewestProducts = async (req, res) => {
    try {
        const products = await Products.find({listProduct: true}).sort({createdAt: -1}).limit(10)
        res.status(200).json(products)
    return
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
        return
    }
}

module.exports = {
    getProductCategories, 
    getMostDiscounted, 
    getMostSold,
    getNewestProducts,
    getMostSoldHomepage,
    getBrandCategories
}