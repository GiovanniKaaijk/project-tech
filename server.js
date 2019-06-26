const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session')
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

//route usage
const register = require('./controls/register');
const login = require('./controls/login');
const profile = require('./controls/profile');
const users = require('./controls/users');
const like = require('./controls/like');
//routes
app.use(express.static('public'))
app.use(require('./routes/routes'))
app.use(register);
app.use(login);
app.use(profile);
app.use(users);
app.use(like);
app.set('view engine', 'pug')

const port = process.env.PORT || 9090
app.listen(port, () => console.log(`Server is gestart op poort: ${port}`))