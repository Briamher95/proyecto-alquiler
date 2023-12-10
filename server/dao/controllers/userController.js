const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const createAccessToken = require("../libs/jwt.js");


const register = async (req, res) => {
    try {
        
        const { password, username, email, isAdmin } = req.body;
        const userFound = await User.findOne({ email})
        if (userFound) {
            return res.status(400).json({ message: "El correo ya esta en uso" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isAdmin
        });

        const savedUser = await newUser.save();
        savedUser.password = undefined;

        const token = await createAccessToken({ id: savedUser._id , isAdmin: savedUser.isAdmin})
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
        const token = await createAccessToken({ id:userFound._id , isAdmin: userFound.isAdmin })
        res.cookie("token", token);
        res.status(201).json({ message: "Usuario Logueado ", user: userFound, token });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const logout =  (req, res) => {
    res.cookie("token","",{expires: new Date (0)})
    return res.status(200).json({ message: "Logout" });
}

const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    
    if (!userFound) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json({ user: userFound })
}

module.exports = { register, login, logout, profile};