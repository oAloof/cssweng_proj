// Purpose: server entry point, connects to the database and starts the server

require('dotenv').config() // loads the environment variables from .env file

// import necessary node_modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const adminProductRoutes = require('./routes/adminProductsRouter')
// const adminOrdersRoutes = require('./src/routes/adminOrdersRouter')
const adminSalesRoutes = require('./routes/adminSalesRouter')
const customerSalesRoutes = require('./routes/customerSalesRouter')
const userController = require('./controllers/userController')
const { authenticate } = require('./middlewares/authenticate')
// express app
const app = express()

// express app settings
app.set('view engine', 'ejs')
app.set('views', './src/views')

// middlewares
const corsOptions = {
    origin: 'http://localhost:3000', // replace with your own URL
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true // allow cookies to be sent to and from the client
};

app.use(cors(corsOptions)) // to allow cross-origin requests
app.use(express.json()) //to parse json content
app.use( express.urlencoded( { extended: true }) ) //to parse body from url
app.use(express.static('public')) // to serve static files
app.use(cookieParser()) // to parse cookies from the request

app.use((req, res, next) => {
    console.log(req.path, req.method) // log the path and method of the request
    next()
})

// API ROUTES 
// Login and Register API
app.post('/api/login', authenticate, userController.loginUser)
app.post('/api/register', authenticate, userController.registerUser)
app.post('/api/logout', authenticate, userController.logoutUser)

// Customer API
app.use('/api/sales', customerSalesRoutes) 

// Admin api
app.use('/api/admin/sales', adminSalesRoutes) // routes related to sales
app.use('/api/admin/products', adminProductRoutes) // routes related to products
// app.use('/admin/orders', adminOrdersRoutes) // routes related to orders


// connect to the mongoDB database
mongoose.connect(process.env.MONGODB_URI)
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