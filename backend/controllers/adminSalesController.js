const Sale = require('../models/saleModel');
const mongoose  = require('mongoose')

const getSales = async (req, res) => {
    try {
        const sales = await Sale.find({}).sort({createdAt: -1})
        res.status(200).json(sales)
    return
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
        return
    }
}

const addSales = async (req, res) => {
    try {
        console.log(req.body); // ! rmv later
        const { 
            location, 
            startDate,
            endDate,
            saleName
        } = req.body 
        // Save new sale to the database
        try {
            const sale = await Sale.create({
                title: saleName,
                location: location,
                startDate: startDate,
                endDate: endDate,
                revenue: 0,
            })
            res.status(200).send({message: "Sale created successfully."})
            return
        } catch (error) {
            console.log(error)
            res.status(500).send({message: 'Server error: failed to save sale to database'})
            // * TODO: Remove the uploaded images from google drive
            return
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Server error'});
    }
}

const deleteSales = async(req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Sale'})
    }

    const sale = await Sale.findOneAndDelete({_id : id})

    if(!sale){
        return res.status(400).json({error: 'No Such Workout'})
    }

    res.status(200).json(sale)
}

const editSale = async(req, res) => {
    try {
        console.log(req.body); // ! rmv later
        const { 
            location, 
            startDate,
            endDate,
            saleName
        } = req.body 

        const {id} = req.params
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No Such Sale'})
        }

        const sale = await Sale.findOneAndUpdate({_id : id}, {
            title: saleName,
            location: location,
            startDate: startDate,
            endDate: endDate,
        })

        if(!sale){
            return res.status(400).json({error: 'No Such Sale'})
        }

        res.status(200).json(sale)
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Server error'});
    }
}

module.exports = {
    getSales,
    addSales, 
    deleteSales, 
    editSale
}
