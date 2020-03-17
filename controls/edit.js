const express = require('express')
const router = express.Router()
const User = require('../controls/userSchema')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().slice(0, 10) + file.originalname)
    }
});
const upload = multer({ storage:storage })

router.post('/updateProfile', upload.single('profilePic'), (req, res) => {
  console.log('running');
  const id = req.session.user._id
  User.findOne({ _id: id }, (err, foundObject) => {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        console.log('User not found in database')
        res.status(404).send()
      } else {
        console.log('user found: ', foundObject)
        console.log('request body:', req.body)
        if (req.body.username) {
          foundObject.username = req.body.username
        } if (req.body.email) {
          foundObject.email = req.body.email
        } if (req.body.password) {
          foundObject.password = req.body.password
        } if (req.file) {
          foundObject.profilePic = ('/uploads/' + req.file.filename)
        }
        req.session.user = foundObject
        foundObject.save((err, updatedObject) => {
          console.log('updatedObject: ', updatedObject)
          if (err) {
            console.log(err)
            res.status(500).send()
          } else {
            res.redirect(`/profile/${id}`)
          }
        })
      }
    }
  })
});


module.exports = router