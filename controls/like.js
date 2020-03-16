const express = require('express')
const router = express.Router()
const User = require('../controls/userSchema')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({
    extended: true
}))

function like(req, res) {
    const id = req.session.user._id
    const userId = req.body.id
    User.findOne({ _id: id }, (err, foundObject) => {
        if (err) {
            console.log(err)
            res.status(500).send()
        } else {
            if (!foundObject) {
                console.log('User not found in database')
                res.status(404).send()
            } else {
                foundObject.likes.forEach(like => {
                    if(userId == like){
                        console.log('You already liked this user')
                        res.status(200).send()
                        res.redirect(`/userprofile/${userId}`)
                        return
                    }
                })
                foundObject.likes.push(userId)
                foundObject.save((err, updatedObject) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send()
                    } else {
                        console.log(foundObject.likes)
                        res.status(200).send()
                        res.redirect(`/userprofile/${userId}`)
                    }
                })
            }
        }
    })
}

function dislike(req, res) {
    const id = req.session.user._id
    const userId = req.body.userid
    User.findOne({ _id: id }, (err, foundObject) => {
        if (err) {
            console.log(err)
            res.status(500).send()
        } else {
            if (!foundObject) {
                console.log('User not found in database')
                res.status(404).send()
            } else {
                const userIndex = foundObject.likes.indexOf(userId)
                if(userIndex > -1) {
                    foundObject.likes.splice(userIndex, 1)
                }
                foundObject.save((err, updatedObject) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send()
                    } else {
                        console.log('user saved ' + updatedObject)
                        res.status(200).send()
                        res.redirect(`/userprofile/${userId}`)
                    }
                })
            }
        }
    })
}

module.exports = {
    like: like,
    dislike: dislike
}