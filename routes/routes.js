const routes = require('express').Router()
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const user = require('../users/user')

const urlencodedParser = bodyParser.urlencoded({extended:false});
//const login = require('../users/login')
const multer = require('multer');
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../public/uploads/');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
let upload = multer({ storage: storage })
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
//upload image https://jsonworld.com/demo/upload-files-to-server-using-node.js-ejs-template-and-multer-package

routes.post('/register',upload.single('file'), (req, res) => {
    // sess.username = req.body.username;
    // sess.password = req.body.password;
    try {
        res.send(req.file);
    } catch(err) {
        res.send(400);
    }
//     if (req.body.password && req.body.username && req.body.file) {
//         if (req.body.username && req.body.password) {
//             console.log(req.body)
//             let userData = {
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: req.body.password,
//                 file: req.body.file
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



routes.use(function(req,res){
        res.status(404).render('404.pug', {
            title: '404 error',
            message: 'Page not found :('
        });
    })

    
module.exports = routes

