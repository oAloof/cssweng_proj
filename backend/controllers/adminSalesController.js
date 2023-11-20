const Sale = require('../models/saleModel');

const getSales = async (req, res) => {
    const sales = await Sale.find({}).sort({createdAt: -1})
    res.status(200).json(sales)
}

const addSales = async (req, res) => {
    try {
        console.log(req.body); // ! rmv later
        res.send('received')
        // Check if the product with the same name and brand already exists
        // const result = await Product.find({ name: name, brand: brand })
        // if (result.length > 0) {
        //     res.status(400).send('Product already exists.')
        //     return
        // }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Server error'});
    }
}

module.exports = {
    getSales,
    addSales
}
