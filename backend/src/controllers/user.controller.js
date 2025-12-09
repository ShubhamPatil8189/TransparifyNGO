import User from '../models/user.model.js';

import bcrypt from "bcrypt";


export const getMyProfile = (req, res) => {
    return res.status(200).json(req.user);
};


export const updateMyProfile = async (req, res) => {
    try {
        const { name, phone, address, password } = req.body;

        const updates = {
            name,
            profile: {
                phone,
                address
            }
        };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            { new: true }
        ).select("-password -code -codeExpiry");

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const listNGOUsers = async (req, res) => {
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

