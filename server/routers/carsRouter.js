const express = require('express');
const { createCar, getAllCars, getCarById } = require('../dao/controllers/carsController');
const carsRouter = express.Router();

// ruta para traer todos los autos a disposicion

carsRouter.get('/', getAllCars);




// endpoint para el nuevo cochechito

carsRouter.post('/', createCar);



// endpoint para el coche por id 

carsRouter.get("/:id", getCarById)



module.exports = carsRouter;

