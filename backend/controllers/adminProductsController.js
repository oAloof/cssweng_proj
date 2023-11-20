const Product = require('../models/productModel');
const upload = require('../middlewares/fileUpload');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).send({products: products})
        return
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
        return
    }
}

const addProduct = async (req, res) => {
    try {
        const { 
            name, 
            brand,
            // description, // ! add description field
            availableQuantity, 
            originalPrice, 
            discountPercentage, 
            discountedPrice,
            listProduct
        } = req.body 
        const images = req.files
        const category = req.body.category.split(',')
        // Check if the product with the same name and brand already exists
        const result = await Product.find({ name: name, brand: brand })
        if (result.length > 0) {
            res.status(400).send({message: 'Product already exists.'})
            return
        }
        // upload the images to google drive
        let imageIDs = []
        try {
            for (let image of images) {
                const imageId = await upload.uploadFile(image)
                imageIDs.push(imageId)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: 'Server error: failed to upload images'})
            return
        }
        // Save new product to the database
        try {
            const product = await Product.create({
                name: name,
                brand: brand,
                // description: description,
                images: imageIDs,
                availableQuantity: availableQuantity,
                originalPrice: originalPrice,
                discountPercentage: discountPercentage,
                discountedPrice: discountedPrice,
                listProduct: listProduct,
                category: category
            })
            res.status(200).send({message: "Product created successfully."})
            return
        } catch (error) {
            console.log(error)
            res.status(500).send({message: 'Server error: failed to save product to database'})
            // * TODO: Remove the uploaded images from google drive
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