const routes = require('express').Router()
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const user = require('../users/user')
const urlencodedParser = bodyParser.urlencoded({extended:false});
const login = require('../users/login')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const OpenIDStrategy = require('passport-openid').Strategy;
const session = require('express-session');
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
routes.get('/', function (req, res) {
    sess = req.session;
    randomCat()
    res.render('index', {
        title: 'Home',
        message: '',
        file: imgsrc
    })
})

routes.get('/login', function (req, res) {
    sess = req.session;
    res.render('login', {
        title: '-',
        message: ''
    })
})
routes.get('/register', function (req, res) {
    sess = req.session;
    res.render('register', {
        title: '-',
        message: ''
    })
})
// routes.get('/auth/openid', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/auth/openid/redirect');
//     });
//   })(req, res, next);
// });
//used https://github.com/Createdd/Writing/blob/9f6f202750d0b91a22ddf64f6c8e9a5f4b0caeb6/2017/articles/AuthenticationIntro.md

routes.post('/register', (req, res) => {
    console.log(req.body)
    sess.username = req.body.username;
    sess.password = req.body.password;
    
    res.redirect('/')
//     if (req.body.password == req.body.passwordconf) {
//         if (req.body.username && req.body.password) {
//             console.log(req.body)
//             let userData = {
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: req.body.password
//             }
//             user.create(userData, (err, user) => {
//                 if(err){
//                     console.log(err)
//                 } else {
//                     return res.redirect('http://localhost:9090/')
//                 }
//             })
//         } else {
//             console.log('Vul alle velden in')
//         }
//   } else {
//       console.log('password is niet gelijk')
//       return res.send('De wachtwoorden komen niet overeen')
//   }
});
//used http://www.passportjs.org/docs/username-password/
// routes.post('/auth/openid', (req, res) => {
//   user.findOne({ email: req.body.email, password: req.body.password }, (err, User) => {
//     Promise.resolve()
//       .then(() => {
//         if (err) {
//           console.log(err)
//           return res.status(500).send()
//         }
//       }).then(() => {
//         if (!User) {
//           return console.log('Failed to log in')
//           res.status(404).send()
//         } else {
//           console.log('Logged in!')
//           res.redirect('/dashboard')
//           res.status(200).send()
//         }
//         req.session.userId = User._id
//         console.log(req.session.userId)
//       })
//   })
// })


routes.use(function(req,res){
        res.status(404).render('404.pug', {
            title: '404 error',
            message: 'Page not found :('
        });
    })

    
module.exports = routes

