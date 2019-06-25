const express = require('express')
const app = express()
const port = 9090
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const OpenIDStrategy = require('passport-openid').Strategy;
const flash = require('connect-flash')
//const login = require('./users/login')(passport)
require('dotenv').config()
// multer

app.use(session({
    secret: 'sessie',
    resave: false,
    saveUninitialized: true,
}));

// Mongodb (Code from cloud.mongodb.com)
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useCreateIndex: true ,useNewUrlParser: true })
    .then(() => console.log('connected'))
    .catch(err => console.error('failed to connect', err))
//routes
app.use(express.static('public'))
app.use(require('./routes/routes'))

app.set('view engine', 'pug')
app.listen(port, () => console.log(`Server is gestart op poort: ${port}`))