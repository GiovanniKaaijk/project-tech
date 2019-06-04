const express = require('express')
const app = express()
const port = 9090
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const OpenIDStrategy = require('passport-openid').Strategy;
const flash = require('connect-flash')
app.use(bodyParser.urlencoded({extended: false}));

module.exports = function(passport){
    passport.use(new LocalStrategy({ session: true },
        function (username, password, done) {
            console.log('function has been reached')

            let auth = {
                username: username
            };
            userSchema.findOne(auth, function (err, user) {
                if (err) throw err;
                if (!user) {
                    console.log('no user found')
                    return done(null, false, {
                        message: 'No user found'
                    });
                }
                bcrypt.compare(password, user.password, function (err, authSucces) {
                    if (err) throw err;
                    if (authSucces) {
                        console.log(`${user.username} is now logged in`);
                        var user_id = user.id
                        return done(null, user.id);
                    } else {
                        return done(null, false, {
                            message: 'Wrong password'
                        });
                    }
                });
            });
        }));
    passport.serializeUser(function (user_id, done) {
        done(null, user_id);
    });

    passport.deserializeUser(function (user_id, done) {
         User.findById(user_id.user, function (error, user) {
             if (error) {
                 done(error);
             } else {
                 done(null, user);
             }
         })
    });
}
