const Sales = require('../models/saleModel');

// GET the date of current ongoing sale
const getOngoingSale = async (req, res) => {
    try {
        const earliestSale = await Sales.findOne().sort({ startDate: 1 });
        res.status(200).send({sale: earliestSale});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error." })
    }
}

module.exports = {
    getOngoingSale
}