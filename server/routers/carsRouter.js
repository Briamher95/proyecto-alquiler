const express = require('express');
const { createCar, getAllCars, getCarById, deleteCarById, updateCarById, rentCar } = require('../dao/controllers/carsController');
const { auth } = require('../dao/controllers/authController');
const carsRouter = express.Router();

// ruta para traer todos los autos a disposicion
carsRouter.get('/', getAllCars);



// endpoint para el nuevo cochechito
carsRouter.post('/', createCar);



// endpoint para el coche por id 
carsRouter.get("/:cid", getCarById)



// eliminar el cochecito por su id 
carsRouter.delete("/:cid", deleteCarById)

//Actualizar el cochecito por su id

carsRouter.patch("/:cid", updateCarById)

// Rentar un auto y asociarlo con el id del usuario
carsRouter.patch("/rent/:cid", auth, rentCar)


module.exports = carsRouter;
