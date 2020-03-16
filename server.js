const express = require('express')
const app = express()
const mongoose = require('mongoose');
const session = require('express-session')
require('dotenv').config()
// multer

app.use(session({
    secret: 'session',
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
const update = require('./controls/edit')
//routes
app.use(express.static('public'))
    .use(require('./routes/routes'))
    .use(register)
    .use(update)
    .set('view engine', 'pug')

const port = process.env.PORT || 9090
app.listen(port, () => console.log(`Server is gestart op poort: ${port}`))