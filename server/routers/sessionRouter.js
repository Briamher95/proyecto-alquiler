const express = require('express');
const { register, login, logout } = require('../dao/controllers/userController');


const sessionRouter = express.Router();

sessionRouter.post("/register", register )

sessionRouter.post("/login", login)

sessionRouter.post("/logout", logout)



module.exports = sessionRouter;