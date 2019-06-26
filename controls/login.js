const express = require('express');
const router = express.Router();
const User = require('../controls/userSchema');
const session = require('express-session');

router.post('/login', (req, res, next) => {
  User.findOne({
    email: req.body.email
  }, (err, currentUser) => {
    console.log(currentUser)
    console.log(req.body.password)
    if (currentUser.password == req.body.password) {
      console.log('correct')
      req.session.user = currentUser;
      res.redirect(`/profile/${req.session.user._id}`)
    } else {
      console.log('incorrect')
      res.redirect('/login')
    }
  });
});

router.get('/login', (req, res ) => {
  res.render('pages/login');
});

module.exports = router;
