const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWTSECRET, {expiresIn: '1h'})
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    // Check if user with email in the database exists
    try {
        const user = await User.findOne({email})
        if (!user) {
            res.status(400).send({message: 'Invalid email or password'})
            return
        }
        res.status(200).send({message: 'User found'})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Server error'})
    }
    
}

const registerUser = async (req, res) => {
    // Check which step of the registration process the user is on
    const { registrationStep } = req.body
    switch (registrationStep) {
        case 1:
            // Check if user with username or email in the database exists
            const { step1Username, step1Email } = req.body
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
            
            let { username, email, password, city, cellNumber, billingAdd, zip } = req.body
            city = city.value
            const userType = 'Customer'
            const newUser = await User.create({username, email, password, userType, city, cellNumber, billingAdd, zip})
            res.status(200).send({message: 'User created'})
            return
    }
}

module.exports = { 
    loginUser,
    registerUser
}