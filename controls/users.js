const express = require('express')
const User = require('../controls/userSchema')

function getUsers (req, res, next) {
    if(!req.session.user){
        res.redirect('/login')
    }
    User.findOne({_id: req.session.user._id}, (err, user) => {
        User.find({ _id: {$ne: req.session.user._id},}, (err, profiles) => {
            res.render('users', {profiles : profiles, currentUser : req.session.user, id: req.session.user._id})
        })
    })
}

module.exports = getUsers