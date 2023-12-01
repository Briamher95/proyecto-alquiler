const express = require('express');
const { register } = require('../dao/controllers/userController');


const sessionRouter = express.Router();

sessionRouter.post("/register", register )

/* sessionRouter.post("/login",) */



module.exports = sessionRouter;