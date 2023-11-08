const mongoose = require('mongoose')
const Sales = require('../models/saleModel')
var moment = require('moment');

// GET all sales view
const allSalesView = async (req, res) => {
    try {
        const sales = await Sales.find({}) // find all products
        res.set('Cache-Control', 'public, max-age=86400')
        res.render('adminViews/salelistAdmin', { sales: sales, moment: moment })  
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const addSaleView = (req, res) => {
    res.render('adminViews/bodegasaleADD')
}

const addNewSale = async (req, res) => {
    var { title, location, startDate, startTime, endDate, endTime } = req.body

    saleList = []

    try {
        // Save product into mongoDB
        const sale = await Sales.create({
            title,
            location,
            startDate,
            startTime,
            endDate,
            endTime,
            saleList,
        })
        res.redirect('/admin/sales')
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

// const deleteProduct = async (req, res) => {    
//     const objID = req.body.productId

//     // check if the id is valid
//     if (!mongoose.isValidObjectId(objID)) {
//         res.status(400).send('Invalid object id')
//         return
//     }
//     // Get the fileID of the images of the product
//     var images = []
//     try {
//         const product = await Product.findById(objID)
//         images = product.images
        
//         for (let image of images) {
//             console.log(image)
//             await deleteFile(image)
//         }

//     } catch (err) {
//         console.log(err)
//     }

//     // delete the product
//     try {
//         const product = await Product.findByIdAndDelete({_id: objID})
//         res.send(product)
//     } catch (err) {
//         console.log(err)
//         res.send(err)
//     }
// }

// const singleProductView = async (req, res) => {

// }

// const updateProductView = async (req, res) => {
//     const product = await Product.findById(req.params.id)
//     res.render('adminViews/editProductDetailsAdmin', { product: product })
// }

// const updateProduct = async (req, res) => {
//     const { name, brand, price, totalQuantity, description, productId } = req.body

//     // check if the id is valid
//     if (!mongoose.isValidObjectId(productId)) {
//         res.status(400).send('Invalid product id')
//         return
//     }

//     // * Implement when available quantity field is implemented on frontend
//     // Check if total quantity is valid
//     // // Total quantity cannot be less than its difference with the available quantity
//     // if (totalQuantity < (totalQuantity - availableQuantity)) {
//     //     res.status(400).send('Invalid total quantity')
//     //     return
//     // }
//     // availableQuantity = availableQuantity - (totalQuantity - availableQuantity)

//     // update the product
//     try {
//         const product = await Product.findByIdAndUpdate(
//             {_id: productId},
//             {
//                 name: name,
//                 brand: brand,
//                 description: description,
//                 // * Implement image update
//                 totalQuantity: totalQuantity,
//                 // * Implement available quantity update
//                 price: price
//             },
//             { new: true },
//         )
//         res.send(product)
//     } catch (err) {
//         console.log(err)
//         res.send(err)
//     }
// }

module.exports = {
    allSalesView,
    addSaleView,
    addNewSale,
    // deleteProduct,
    // singleProductView,
    // updateProductView,
    // updateProduct
}