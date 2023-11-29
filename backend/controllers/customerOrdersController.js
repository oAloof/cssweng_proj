const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Product = require('../models/productModel')
const upload = require('../middlewares/fileUpload')
const crypto = require('crypto')

const addOrder = async (req, res) => {
    // Check if user is logged in
    if (!req.user) {
        res.status(400).send({message: 'User is not logged in.'})
        return
    }

    const { _id } = req.user

    // Check if user exists in the database
    const user = await User.findOne({_id})
    if (!user) {
        res.status(404).send({ message: 'User not found.' })
        return
    }

    const {
        referenceNumber,
        totalCost,
        email,
        firstName,
        lastName,
        contactNumber,
        streetAddress,
        city,
    } = req.body
    const order = JSON.parse(req.body.order)
    const images = req.files
    // GENERATE unique order number
    const timestamp = Date.now().toString(); // Get the current timestamp
    const data = `${user._id}-${timestamp}` // Concatenate user ID and timestamp
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    const orderNumber = hash.substring(0, 10) // Get the first 10 characters of the hash

    // upload the images to google drive
    let imageIDs = []
    try {
        for (let i = 0; i < images.length; i++) {
            let orderNo = orderNumber + '-' + (i + 1)
            const imageId = await upload.uploadPaymentImage(images[i], orderNo)
            imageIDs.push(imageId)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error: failed to upload images'})
        return
    }
    // Subtract the quantity of the products ordered from the database and add to the quantity sold 
    for (let i = 0; i < order.length; i++) {
        const product = await Product.findOne({_id: order[i].id})
        if (!product) {
            res.status(404).send({message: 'Product not found.'})
            return
        }
        product.availableQuantity -= order[i].quantity
        product.quantitySold += order[i].quantity
        await product.save()
    }

    // Transform order to match the schema using map
    const orderToSave = order.map((item) => {
        return {
            product: item.id,
            quantity: item.quantity
        }
    })

    // Save new order to the database
    const newOrder = await Order.create({
        referenceNumber: referenceNumber,
        orderNumber: orderNumber,
        customer: user._id,
        order: orderToSave,
        totalCost: totalCost,
        personRecievingEmail: email,
        personReceiving: firstName + ' ' + lastName,
        personRecievingNum: contactNumber,
        deliveryAddress: streetAddress + ', ' + city,
        screenshotOfPayment: imageIDs
    })
    
    res.status(200).send({message: 'Payment verification successful.'})
}

module.exports = {
    addOrder
}