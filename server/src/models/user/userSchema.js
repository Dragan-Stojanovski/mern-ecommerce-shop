const mongoose = require("mongoose");
const passwordValidators = require("../../services/validators/passwordValidator.js");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,

  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    validate: passwordValidators,
  },
  firstName:{
    type:String, 
  },
  secondName:{
    type:String, 
  },
  phone: {
    type:String, 
  },
  gender: {
    type:String
  },
  profilePicture: { type: String, default: '' },
});

module.exports = mongoose.model("UserSchema", UserSchema);