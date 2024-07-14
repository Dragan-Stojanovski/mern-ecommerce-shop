const mongoose = require("mongoose");
const passwordValidators = require("../../services/validators/passwordValidator.js");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: [6, 'Username must be at least 6 characters'],
    maxlength: [15, 'Username must be at most 15 characters']
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
    validate: passwordValidators
    
  },
  
  profilePicture: { type: String, default: '' },
});

module.exports = mongoose.model("UserSchema", UserSchema);