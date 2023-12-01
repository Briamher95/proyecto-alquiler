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



const login = async (req, res) => {
    try {
        const { password, email } = req.body;
        const userFound = await User.findOne({email})
        if (!userFound) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        userFound.password = undefined;
        const token = await createAccessToken({ id:userFound._id })
        res.cookie("token", token);
        res.status(201).json({ message: "Usuario Logueado ", user: userFound, token });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const logout =  (req, res) => {
    res.cookie("token","")
    return res.status(200).json({ message: "Logout" });
}

module.exports = { register, login, logout};