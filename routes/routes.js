const routes = require('express').Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})
const multer = require('multer')

const profilePages = require('../controls/profile')
const likes = require('../controls/like')
const login = require('../controls/login')
const getUsers = require('../controls/users')

routes.use(bodyParser.urlencoded({extended: false}))
//multer
let storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/'))
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace() + file.originalname)
    }
})
const upload = multer({ storage:storage })

routes.get('/', (req, res) => {
    if(!req.session.user){
        res.redirect('/login')
    }
    else {
        res.redirect('/users')
    }
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

routes.get('/update', (req, res) => {
    if (!req.session.user){
      res.redirect('/login');
      return
    }
    console.log(req.session.user)
    res.render('update', {user: req.session.user});
});

routes.get('/profile/:id', profilePages.profilePage)
routes.get('/userprofile/:id', profilePages.userProfile)
routes.post('/like', likes.like)
routes.post('/dislike', likes.dislike)
routes.post('/login', login)
routes.get('/users', getUsers)

module.exports = routes

