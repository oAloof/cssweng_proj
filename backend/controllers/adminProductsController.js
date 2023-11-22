const Product = require('../models/productModel');
const upload = require('../middlewares/fileUpload');
const mongoose = require('mongoose');
const { deleteFile } = require('../middlewares/fileDelete');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
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
            description, 
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
                description: description,
                images: imageIDs,
                availableQuantity: availableQuantity,
                originalPrice: originalPrice,
                discountPercentage: discountPercentage,
                discountedPrice: discountedPrice,
                listProduct: listProduct,
                category: category, 
                quantitySold: 0,
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

const editProduct = async (req, res) => {
    try {
        const {
            productId,
            name,
            brand,
            description, 
            availableQuantity, 
            originalPrice, 
            discountPercentage, 
            discountedPrice,
            listProduct,
            deletedImages
        } = req.body 
        const images = req.files
        const category = req.body.category.split(',')
        // Check if the productId exists in the database
        const product = await Product.findById(productId)
        if (!product) {
            res.status(400).send({message: 'Product does not exist.'})
            return
        }
        // check if there were images deleted
        if (deletedImages) {
            // delete the images from google drive
            try {
                // Check if deletedImages is an array or not
                if (!Array.isArray(deletedImages)) {
                    await deleteFile(deletedImages)
                } else {
                    for (let imageId of deletedImages) {
                        await deleteFile(imageId)
                    }
                }
                
                // delete the image ids from the product
                product.images = product.images.filter(imageId => !deletedImages.includes(imageId))
            } catch (error) {
                console.log(error)
                res.status(500).send({message: 'Server error: failed to delete images'})
                return
            }
        }

        // check if there were images added
        if (images) {
            // upload the images to google drive
            try {
                for (let image of images) {
                    const imageId = await upload.uploadFile(image)
                    product.images.push(imageId)
                }
            } catch (error) {
                console.log(error)
                res.status(500).send({message: 'Server error: failed to upload new images'})
                return
            }
        }

        // update the product
        try {
            product.name = name
            product.brand = brand
            product.description = description
            product.availableQuantity = availableQuantity
            product.originalPrice = originalPrice
            product.discountPercentage = discountPercentage
            product.discountedPrice = discountedPrice
            product.listProduct = listProduct
            product.category = category
            const updatedProduct = await product.save()
            res.status(200).send({message: "Product updated successfully."})
            return
        } catch (error) {
            console.log(error)
            res.status(500).send({message: 'Server error: failed to save product to database'})
            return
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Server error'});
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.body

     // check if the id is valid
     if (!mongoose.isValidObjectId(id)) {
        res.status(400).send('Invalid product id')
        return
    }
    try {
        const product = await Product.findById(id)
        // check if the product exists
        if (!product) {
            res.status(400).send({message: 'Product does not exist'})
            return
        }
        // delete product images from google drive
        for (let imageId of product.images) {
            await deleteFile(imageId)
        }
        // delete product from database
        await Product.findByIdAndDelete(id)
        res.status(200).send({message: 'Product deleted successfully'})
        return
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
        return
    }
}

module.exports = {
    getProducts,
    addProduct,
    editProduct,
    deleteProduct
}