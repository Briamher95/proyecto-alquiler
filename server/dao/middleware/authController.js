const jwt = require('jsonwebtoken');
const User = require("../models/userModel.js");



const authMiddleware  = async (req,res,next) => {
    try{
        const token = req.cookies.token
        if (!token){
            return res.status(403).json({message: "Por favor log-in"})
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified){
            return res.status(403).json({message: "token invalido"})
        }

        const user = await User.findById(verified.id)
        if (!user){
            return res.status(403).json({message: "Usuario no encontrado"})
        }
        req.user = user
        next()
    }

    catch(err){
        return res.status(500).json({message:"Error del servidor interno" , error: err.message})
    }
}




const adminMiddleware = async (req, res, next) => {
    try {

        if (!req.user) {
            return res.status(403).json({ message: 'Usuario no autenticado' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
        }

        next();
    } catch (err) {
        return res.status(500).json({ message: 'Error del servidor interno', error: err.message });
    }
};

module.exports = {authMiddleware , adminMiddleware}