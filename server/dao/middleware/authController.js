const jwt = require('jsonwebtoken');
const User = require("../models/userModel.js");

 // validacion de token
const authRequire  = async (req,res,next) => {
    try{
        const token = req.cookies.token
        if (!token){
            return res.status(403).json({message: "Por favor log-in"})
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err){
                return res.status(403).json({message: "token invalido"})
            }

            req.user = user //aca esta la magia , agregamos una propiedad .user con los datos del usuario.

        })
        next()
    }

    catch(err){
        return res.status(500).json({message:"Error del servidor interno" , error: err.message})
    }
}


const adminRequire = async (req, res, next) => {
    try {

        if (!req.user) {
            return res.status(403).json({ message: 'Usuario no autenticado' });
        }

        const userFound = await User.findById(req.user.id);
        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (!userFound.isAdmin) {
            return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
        }

        next();
    } catch (err) {
        return res.status(500).json({ message: 'Error del servidor interno', error: err.message });
    }
};

module.exports = {authRequire , adminRequire}