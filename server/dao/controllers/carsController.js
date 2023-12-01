const express = require("express")
const Car = require("../models/carModel")

//Crear un nuevo auto

const createCar = async (req, res) => {
    const car = new Car({
        marca : req.body.marca,
        modelo : req.body.modelo,
        ano: req.body.ano,
        precioPorDia: req.body.precioPorDia,
        patente : req.body.patente,
        disponible: req.body.disponible
    })

    try{
        const newCar = await car.save();
        res.status(201).json(newCar);
    
    }
    catch(err){
        if (err.code === 11000){
            return res.status(400).json({message: "La patente ya existe"})
        } else{
            res.status(400).json({message: err.message})
        }
    }
}

//Obtener todos los autos

const getAllCars = async (req, res) => {
    try{
        const cars = await Car.find()
        res.json(cars)
    }
    catch(err){
        res.status(500).json({message: err.message})
        }
    }

//Obtener un auto por su id

const getCarById = async (req, res) => {
    const {cid} = req.params
    try{
        const carById = await Car.findById(cid)
        if (!carById){
            return res.status(404).json({message: "No se encontro el auto"})
        }
        res.json(carById)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

//Eliminar el auto

const deleteCarById = async (req, res) => {
    const {cid} = req.params
    try{
        const deletedCar = await Car.findByIdAndDelete(cid)
        if (!deletedCar){
            return res.status(404).json({message: "No se pudo elminar ese auto"})
        }
        res.json({message:"El auto ha sido eliminado"})
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
}

//Updatear las keys de un auto por id

const updateCarById = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["marca", "modelo", "ano", "precioPorDia", "patente","disponible"]

    const isValid = updates.every((update)=> allowedUpdates.includes(update))

    if (!isValid){
        return res.status(400).json({message: "Actualizacion no valida , revise los campos"})
    }
    try{
        const carUpdated = await Car.findByIdAndUpdate(req.params.cid, req.body, {new: true, runValidators: true})
        if (!carUpdated){
            return res.status(404).json({message: "No se encontro el auto "})
        }
        res.json({message: "Se ha actualizado correctamente", car: carUpdated})
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
}

const rentCar = async (req, res) => {
    try{
        const {cid} = req.params
        const car = await Car.findById(cid)
        if (!car){
            return res.status(404).json({message: "No se encontro el auto"})
        }
        if(!car.disponible){
            return res.status(400).json({message: "El auto ya esta alquilado"})
        }
        car.rentedBy = req.user._id; // RECORDA! : TENEMOS QUE AGARRAR EL ID DE LA PETICION DEL CLIENTE AL SERVER.
        car.disponible = false

        const updatedCar = await car.save()
        res.json({message: "Auto alquilado", car: updatedCar})
    }
    catch(err){
        res.status(500).json({message:"Error en el servidor" , error: err.message})
    }
}


module.exports = {createCar, getAllCars , getCarById, deleteCarById , updateCarById , rentCar}