const routes = require('express').Router()
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
const user = require('../users/user')
const urlencodedParser = bodyParser.urlencoded({extended:false});
const login = require('../users/login')
const session = require('express-session');
const mongoose = require('mongoose');
const login = require('../users/login')
const login = require('../users/login')
const multer = require('multer');
routes.use(bodyParser.urlencoded({extended: false}));
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

function checkLogin(req, res) {
    if(!req.isAuthenticaded()){
        res.redirect('/login')
    }
}
routes.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
let sess;
routes.get('/', (req, res) => {
    sess = req.session;
    randomCat()
    res.render('index', {
        title: 'Home',
        message: '',
        file: imgsrc
    })
})

routes.get('/login', (req, res) => {
    sess = req.session;
    res.render('login', {
        title: '-',
        message: ''
    })
})
routes.get('/register', upload.single('file'), (req, res) => {
    sess = req.session;
    res.render('register', {
        title: '-',
        message: ''
    })
})

routes.post('/register', upload.single('file'), (req, res) => {
    console.log(req.body)
    res.redirect('/')
    if (req.body.password == req.body.passwordconf) {
        if (req.body.username && req.body.password) {
            console.log(req.body)
            let userData = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePic: req.file ? ('/upload/' + req.file.filename) ? undefined,
            }
            user.create(userData, (err, user) => {
                if(err){
                    console.log(err)
                } else {
                    return res.redirect('http://localhost:9090/')
                }
            })
        } else {
            console.log('Vul alle velden in')
        }
  } else {
      console.log('password is niet gelijk')
      return res.send('De wachtwoorden komen niet overeen')
  }
});

routes.use(function(req,res){
        res.status(404).render('404.pug', {
            title: '404 error',
            message: 'Page not found :('
        });
    })

    
module.exports = routes

