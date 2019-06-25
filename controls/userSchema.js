const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordconf: {
    type: String,
    required: false,
  },
  likes: [],
  profilePic: String,
});

let user = mongoose.model('User', userSchema);
module.exports = user;