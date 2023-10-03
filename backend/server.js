// Purpose: server entry point, connects to the database and starts the server

require('dotenv').config() // loads the environment variables from .env file

// import necessary node_modules
const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRouter')

// express app
const app = express()

// middlewares
app.use(express.json()) // allows the req.body parameter to be accessed

app.use((req, res, next) => {
    console.log(req.path, req.method) // log the path and method of the request
    next()
})

// routes
app.use('/api/products', productRoutes) // all routes in productRoutes will start with /api/products

// connect to the mongoDB database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,      // use the new URL parser
    useUnifiedTopology: true    // use the new server discovery and monitoring engine
})
    .then (() => {
        console.log('Connected to database.')
        
        // start listening for requests
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${ process.env.PORT }...`)
        })
    })
    .catch((err) => {
        console.log(err)
    })