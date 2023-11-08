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

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/homepage_general', (req, res) => {
    res.render('homepage_general')
})

app.get('/profile', (req, res) => {
    res.render('profile_customer')
})

app.get('/profile_edit', (req, res) => {
    res.render('profile_customer_edit')
})

app.get('/cart_user', (req, res) => {
    res.render('cart_user')
})

app.use('/admin/products', adminProductRoutes) // routes related to products

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