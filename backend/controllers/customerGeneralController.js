const Products = require('../models/productModel');

const getProducts = async (req, res) => {
    try {
        const products = await Products.find({listProduct: true}).sort({createdAt: -1})
        res.status(200).json(products)
    return
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
        return
    }
}

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

module.exports = {
    getProducts,
    getProductCategories
}