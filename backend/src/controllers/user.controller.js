const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');

const getMyProfile = (req, res) => {
    return res.status(200).json(req.user);
};

const updateMyProfile = async (req, res) => {
  try {
    const { name, phone, address, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If password change requested, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: "Current password is required" });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      
      if (isMatch) user.password = newPassword;
    }

    // Update name, phone, address
    if (name) user.name = name;
    if (phone) user.profile.phone = phone;
    if (address) user.profile.address = address;

    const updatedUser = await user.save();

    // Return updated user without sensitive fields
    const safeUser = updatedUser.toObject();
    delete safeUser.password;
    delete safeUser.code;
    delete safeUser.codeExpiry;

    res.status(200).json(safeUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const listNGOUsers = async (req, res) => {
    try {
        const users = await User.find({
            roles: { $in: ["NGO_ADMIN"] }   // only admins of the same NGO
        }).select("-password -code -codeExpiry");

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getMyProfile,
    updateMyProfile,
    listNGOUsers
};
