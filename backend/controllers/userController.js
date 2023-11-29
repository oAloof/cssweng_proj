const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/userModel')

const getUserData = async (req, res) => {
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
    // Remove password from user object
    user.password = undefined
    res.status(200).send({ user })
}

const getAuthData = async (req, res) => {
    if (!req.user) {
        res.status(200).send({
            message: 'Authentication data found.',
            isAuthenticated: false,
        })
        return
    }
    const { _id } = req.user
    // Check if user exists in the database
    const user = await User.findOne({_id})

    if (!user) {
        res.status(404).send({
            message: 'User not found.',
            isAuthenticated: false,
        })
        return
    }

    res.status(200).send({
        message: 'Authentication data found.',
        isAuthenticated: true,
        userType: user.userType,
    })
}   

const loginUser = async (req, res) => {
    // Check if user is already logged in
    console.log(req.user)
    if (req.user) {
        res.status(400).send({message: 'User is already logged in.'})
        return
    }

    const { username, password } = req.body
    // Check if user with email in the database exists
    try {
        const user = await User.findOne({username})
        if (!user) {
            res.status(400).send({message: 'Invalid login credentials.'})
            return
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            res.status(400).send({message: 'Invalid login credentials.'})
            return
        }

        const token = jwt.sign({_id: user._id, userType: user.userType}, process.env.JWTSECRET, {expiresIn: '3h'})
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600000 });
        res.status(200).send({
            message: 'User found.',
            userType: user.userType,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error.'})
    }
}

const registerUser = async (req, res) => {
    // Check if user is already logged in
    if (req.user) {
        res.status(200).send({message: 'User is already logged in.'})
        return
    }

    // Check which step of the registration process the user is on
    const { registrationStep } = req.body
    switch (registrationStep) {
        case 1:
            // Check if user with username or email in the database exists
            const step1Username = req.body.username
            const step1Email = req.body.email
            let user = await User.findOne({username: step1Username})
            if (user) {
                res.status(400).send({message: 'Username already exists.'})
                return
            }
            user = await User.findOne({email: step1Email})
            if (user) {
                res.status(400).send({message: 'Email already exists.'})
                return
            }
            res.status(200).send({message: 'User may be created.'})
            return
        case 2:
            // Create the user 
            const { username, firstName, lastName, email, password, city, contactNumber, streetAddress, zip } = req.body
            // Hash the password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            
            const newUser = await User.create({
                username: username, 
                firstName: firstName,
                lastName: lastName,
                email: email, 
                password: hashedPassword, 
                userType: 'Customer', 
                city: city.value, 
                contactNumber: contactNumber, 
                streetAddress: streetAddress, 
                zip: zip})
            res.status(200).send({message: 'User created.'})
            return
    }
}

const logoutUser = (req, res) => { 
    // Check if user is already logged in
    if (!req.user) {
        res.status(400).send({message: 'User is not logged in.'})
        return
    }

    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' })
    res.status(200).send({message: 'User logged out.'})
}

const getCart = async (req, res) => {
    // Check if user is logged in
    if (!req.user) {
        res.status(400).send({message: 'User is not logged in.'})
        return
    }

    const { _id } = req.user
    // Check if user exists in the database
    const user = await User.findOne({_id}).populate('cartItems.product');
    if (!user) {
        res.status(404).send({ message: 'User not found.' })
        return
    }
    // For each cart item, add to array of products
    const cart = user.cartItems.map(item => {
        return {
            id: item.product._id,
            name: item.product.name,
            brand: item.product.brand,
            quantity: item.quantity,
            originalPrice: item.product.originalPrice,
            discountedPrice: item.product.discountedPrice, 
            image: item.product.images[0],
            availableQuantity: item.product.availableQuantity
        };
    });
    res.status(200).send({ cart })
}

const updateCart = async (req, res) => {
    // Check if user is logged in
    if (!req.user) {
        res.status(400).send({message: 'User is not logged in.'})
        return
    }

    const { _id } = req.user
    const { productId, quantity } = req.body
    // Check if user exists in the database
    const user = await User.findOne({_id})
    if (!user) {
        res.status(404).send({ message: 'User not found.' })
        return
    }

    const cartIndex = user.cartItems.findIndex(item => item.product.toString() === productId);

    if (cartIndex > -1) {
        // Update quantity if product exists
        user.cartItems[cartIndex].quantity += quantity;
    } else {
    // Add new item if product does not exist
    user.cartItems.push({ product: productId, quantity });
    }
    await user.save();
    res.status(200).send({ message: 'Cart updated.' })
}

const deleteCartItem = async (req, res) => {
    // Check if user is logged in
    if (!req.user) {
        res.status(400).send({message: 'User is not logged in.'})
        return
    }

    const { _id } = req.user
    const { productId } = req.body

    // Check if user exists in the database
    const user = await User.findOne({_id})
    if (!user) {
        res.status(404).send({ message: 'User not found.' })
        return
    }

   // Remove from cart if product exists using filter
    user.cartItems = user.cartItems.filter(item => item.product.toString() !== productId);
    await user.save();
    res.status(200).send({ message: 'Cart updated.' })
}

const updateCartItemQuantity = async (req, res) => {
    // Check if user is logged in
    if (!req.user) {
        res.status(400).send({message: 'User is not logged in.'})
        return
    }

    const { _id } = req.user
    const { productId, quantity } = req.body

    // Check if user exists in the database
    const user = await User.findOne({_id})
    if (!user) {
        res.status(404).send({ message: 'User not found.' })
        return
    }

    const cartIndex = user.cartItems.findIndex(item => item.product.toString() === productId);

    if (cartIndex > -1) {
        // Update quantity if product exists
        user.cartItems[cartIndex].quantity = quantity;
    } else {
        // Add new item if product does not exist
        user.cartItems.push({ product: productId, quantity });
    }
    await user.save();
    res.status(200).send({ message: 'Cart updated.' })
}
    
module.exports = { 
    getAuthData,
    loginUser,
    registerUser,
    logoutUser,
    getCart,
    updateCart,
    deleteCartItem,
    updateCartItemQuantity,
    getUserData
}