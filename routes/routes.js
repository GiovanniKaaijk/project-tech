const routes = require('express').Router()
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
const user = require('../controls/userSchema');
const urlencodedParser = bodyParser.urlencoded({extended:false});
const session = require('express-session');
const mongoose = require('mongoose');
const multer = require('multer');
routes.use(bodyParser.urlencoded({extended: false}));
//multer
let storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace() + file.originalname)
    }
});
const upload = multer({ storage:storage })
//placeholder while fetch is still loading
let imgsrc = 'https:\/\/purr.objects-us-east-1.dream.io\/i\/20160628_130711.jpg';

const randomCat = () => {
fetch('https://aws.random.cat/meow')
.then(res => res.json())
.then(json => {
    imgsrc = json.file; 
    });
};

routes.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
let sess;
routes.get('/', (req, res) => {
    if(!req.session.user){
        res.redirect('/login')
    }
    randomCat()
    res.render('index', {
        title: 'Home',
        file: imgsrc
    })
})

routes.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
    })
})
routes.get('/register', upload.single('file'), (req, res) => {
    res.render('register', {
        title: 'Register',
    })
})
    
module.exports = routes

