const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserSchema = require("../../models/user/userSchema");

exports.login = async (req, res) => {
    try {
      const user = await UserSchema.findOne({ username: req.body.username });
  
      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }
  
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Authentication failed" });
      }
  
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET, 
        { expiresIn: "1h" }
      );
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  exports.register = async (req, res) => {
    try {
      const { username, password, email } = req.body;
  
      const userExists = await UserSchema.findOne({ username });
      const emailExists = await UserSchema.findOne({ email });
  
      if (userExists) {
        return res.status(400).json({ message: "Username already taken" });
      }
  
      if (emailExists) {
        return res.status(400).json({ message: "Email already taken" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new UserSchema({
        email,
        username,
        password: hashedPassword,
      });
  
      await user.save();
  
      res.status(201).json({
        id: user._id,
        username: user.username,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation error", errors: validationErrors });
      }
  
      res.status(500).json({ message: "Error in saving user", error: error.message });
    }
  };