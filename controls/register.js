const routes = require('express').Router()
const bodyParser = require('body-parser')
const user = require('../controls/userSchema');
const urlencodedParser = bodyParser.urlencoded({extended:false});
const session = require('express-session');
const multer = require('multer');
const path = require('path');
routes.use(bodyParser.urlencoded({extended: false}));
//multer
let storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().slice(0, 10) + file.originalname)
        //.slide(0, 10) turns / into -
    }
});
const upload = multer({ storage:storage })

routes.post('/register', upload.single('file'), (req, res) => {
        if (req.body.username && req.body.password) {
            let userData = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePic: req.file ? ('/uploads/' + req.file.filename) : undefined,
            }
            user.create(userData, (err, user) => {
                if(err){
                    console.log(err)
                } else {
                    req.session.user = userData;
                    res.redirect(`/login`)
                }
            })
        } else {
            console.log('Vul alle velden in')
  }
});

module.exports = routes;