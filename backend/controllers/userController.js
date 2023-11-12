const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWTSECRET, {expiresIn: '1h'})
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    // Check if email is valid
    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email')
    }
    
    res.send()
}

module.exports = { loginUser }