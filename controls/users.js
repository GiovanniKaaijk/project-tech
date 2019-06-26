const express = require('express');
const router = express.Router();
const User = require('../controls/userSchema');
const session = require('express-session');
//teamproject
router.get('/users', (req, res, next) => {
    if(!req.session.user){
        res.redirect('/login')
    }
    User.findOne({
        _id: req.session.user._id
    }, (err, user) => {
        User.find({ _id: {$ne: req.session.user._id},
        }, (err, profiles) => {
            res.render('users', {profiles : profiles, currentUser : req.session.user})
        });
    });
});

module.exports = router;