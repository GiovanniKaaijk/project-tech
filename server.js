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
require('dotenv').config()
// multer

// Mongodb (Code from cloud.mongodb.com)
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useCreateIndex: true ,useNewUrlParser: true })
    .then(() => console.log('connected'))
    .catch(err => console.error('failed to connect', err))



//routes
app.use(express.static('public'))
app.use(require('./routes/routes'))
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
}));
app.set('view engine', 'pug')
app.listen(port, () => console.log(`Server is gestart op poort: ${port}`))
