const routes = require('express').Router()
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const user = require('../users/user')
const urlencodedParser = bodyParser.urlencoded({extended:false});
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
routes.use(bodyParser.urlencoded({extended: false}));
//placeholder while fetch is still loading
let imgsrc = 'https:\/\/purr.objects-us-east-1.dream.io\/i\/20160628_130711.jpg';

const randomCat = () => {
fetch('https://aws.random.cat/meow')
.then(res => res.json())
.then(json => {
    imgsrc = json.file; 
    });
};


routes.get('/', function (req, res) {
    randomCat()
    res.render('index', {
        title: 'Home',
        message: '',
        file: imgsrc
    })
})

routes.get('/login', function (req, res) {
    res.render('login', {
        title: '-',
        message: ''
    })
})
routes.get('/register', function (req, res) {
    res.render('register', {
        title: '-',
        message: ''
    })
})

//used https://github.com/Createdd/Writing/blob/9f6f202750d0b91a22ddf64f6c8e9a5f4b0caeb6/2017/articles/AuthenticationIntro.md

routes.post('/register', (req, res) => {
    console.log(req.body)
    if (req.body.password == req.body.passwordconf) {
        if (req.body.username && req.body.password) {
            console.log(req.body)
            let userData = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
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

