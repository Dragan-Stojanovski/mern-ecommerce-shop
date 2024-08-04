const UserSchema = require("../../models/user/userSchema");
const bcrypt = require("bcryptjs");


exports.getUserOwnData = async (req, res) => {
    try {
      const userData = await UserSchema.findById(req.user.userId).select("-password");
      res.json(userData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const updateFields = req.body;
  
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }
  
      const updatedUser = await UserSchema.findByIdAndUpdate(userId, updateFields, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation error", errors: validationErrors });
      }
  
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  };


exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming user ID is stored in req.user after authentication
    const { oldPassword, newPassword } = req.body;

    // Validate request body
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Old and new passwords are required' });
    }

    // Find the user
    const user = await UserSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error changing password', error: error.message });
  }
};


