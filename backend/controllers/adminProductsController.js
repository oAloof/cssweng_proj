const Product = require('../models/productModel');

const getProducts = async (req, res) => {
    
}

const addProduct = async (req, res) => {
    try {
        console.log(req.body); // ! rmv later
        // Check if the product with the same name and brand already exists
        const result = await Product.find({ name: name, brand: brand })
        if (result.length > 0) {
            res.status(400).send('Product already exists.')
            return
        }

        

    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Server error'});
    }
}

module.exports = {
    getProducts,
    addProduct
}