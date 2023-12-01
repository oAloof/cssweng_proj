const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        req.user = decoded
        next()
    } catch (err) {
        req.user = null
        next()
    }
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.userType === 'Admin') {
        next()
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
}

module.exports = {
    authenticate,
    isAdmin
}