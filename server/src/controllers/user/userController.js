const UserSchema = require("../../models/user/userSchema");


const getUserOwnData = async (req, res) => {
    try {
      const userData = await UserSchema.findById(req.user.userId).select("-password");
      res.json(userData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = { getUserOwnData};
