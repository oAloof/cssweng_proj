// Purpose: server entry point, connects to the database and starts the server

require('dotenv').config() // loads the environment variables from .env file

// import necessary node_modules
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const adminProductRoutes = require('./src/routes/adminProductRouter')

// express app
const app = express()

// express app settings
app.set('view engine', 'ejs')
app.set('views', './src/views')

// middlewares
app.use(express.json()) //to parse json content
app.use( express.urlencoded( { extended: true }) ) //to parse body from url
app.use(express.static('public')) // to serve static files

app.use((req, res, next) => {
    console.log(req.path, req.method) // log the path and method of the request
    next()
})

// ROUTES 
// cutomer views
app.get('/', (req, res) => {
    res.render('customerViews/homepage_general')
})

// admin views
app.get('/admin', (req, res) => {
    res.render('adminViews/homepage_admin')
})

app.get('/admin/sales', (req, res) => {
    res.render('adminViews/viewbodega')
})

app.use('/admin/products', adminProductRoutes) // routes related to admin products

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
      // A Multer error occurred when uploading 
      return res.status(400).json({ message: error.message });
    } else if (error) {
      // An unknown error occurred 
      return res.status(500).json({ message: error.message });
    }
  
    // If this middleware was called without an error, just pass to next middleware
    next()
  })

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