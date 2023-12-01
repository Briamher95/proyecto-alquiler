
const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const createAccessToken = require("../libs/jwt.js");


const register = async (req, res) => {
    try {
        const { password, username, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        savedUser.password = undefined;

        const token = await createAccessToken({ id: savedUser._id })
        res.cookie("token", token);
        res.status(201).json({ message: "Usuario creado ", user: savedUser, token });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



module.exports = { register };