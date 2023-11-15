const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/userModel')

const loginUser = async (req, res) => {
    // Check if user is already logged in
    if (req.user) {
        res.status(200).send({message: 'User is already logged in'})
        return
    }

    const { username, password } = req.body
    // Check if user with email in the database exists
    try {
        const user = await User.findOne({username})
        if (!user) {
            res.status(400).send({message: 'Invalid login credentials'})
            return
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            res.status(400).send({message: 'Invalid login credentials'})
            return
        }

        const token = jwt.sign({_id: user._id}, process.env.JWTSECRET, {expiresIn: '3h'})
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600000 });
        res.status(200).send({message: 'User found'})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
    }
}

const registerUser = async (req, res) => {
    // Check if user is already logged in
    if (req.user) {
        res.status(200).send({message: 'User is already logged in'})
        return
    }

    // Check which step of the registration process the user is on
    const { registrationStep } = req.body
    switch (registrationStep) {
        case 1:
            // Check if user with username or email in the database exists
            const step1Username = req.body.username
            const step1Email = req.body.email
            let user = await User.findOne({step1Username})
            if (user) {
                res.status(400).send({message: 'Username already exists'})
                return
            }
            user = await User.findOne({step1Email})
            if (user) {
                res.status(400).send({message: 'Email already exists'})
                return
            }
            res.status(200).send({message: 'User may be created'})
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
            res.status(200).send({message: 'User created'})
            return
    }
}

const logoutUser = (req, res) => { 
    // Check if user is already logged in
    if (!req.user) {
        res.status(200).send({message: 'User is not logged in'})
        return
    }

    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' })
    res.status(200).send({message: 'User logged out'})
}

module.exports = { 
    loginUser,
    registerUser,
    logoutUser
}