const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).send({message: 'Unauthorized'})
        // req.user = null
        // next()
    }
}

module.exports = authenticate