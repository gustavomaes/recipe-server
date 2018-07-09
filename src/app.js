const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Recipe = require('./models/recipe')
const User = require('./models/user')

const indexRoute = require('./routes/index-route')
const recipeRoute = require('./routes/recipe-route')
const userRoute = require('./routes/user-route')

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
}

const app = express()

mongoose.connect(process.env.CONN_STRIN)

app.use(bodyParser.json({
    limit: '10mb'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute)
app.use('/recipe', recipeRoute)
app.use('/user', userRoute)

module.exports = app