const express = require("express")
const Car = require("../models/carModel")
const upload = require("../../config/multerConfig")

//Crear un nuevo auto
const createCar = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const car = new Car({
            marca: req.body.marca,
            modelo: req.body.modelo,
            ano: req.body.ano,
            precioPorDia: req.body.precioPorDia,
            patente: req.body.patente,
            disponible: req.body.disponible,
            image: req.file ? req.file.originalname : null
        })

        try {
            const newCar = await car.save();
            res.status(201).json(newCar);

        }
        catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({ message: "La patente ya existe" })
            } else {
                res.status(400).json({ message: err.message })
            }
        }
    })
}

//Obtener todos los autos

const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find()
        res.json(cars)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Obtener un auto por su id

const getCarById = async (req, res) => {
    const { cid } = req.params
    try {
        const carById = await Car.findById(cid)
        if (!carById) {
            return res.status(404).json({ message: "No se encontro el auto" })
        }
        res.json(carById)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Eliminar el auto

const deleteCarById = async (req, res) => {
    const { cid } = req.params
    try {
        const deletedCar = await Car.findByIdAndDelete(cid)
        if (!deletedCar) {
            return res.status(404).json({ message: "No se pudo elminar ese auto" })
        }
        res.status(201).json({ message: "El auto ha sido eliminado" })
    }
    catch (err) {
        res.status(500).json({ message: "Hubo un error", error: err.message })
    }
}

//Updatear las keys de un auto por id

const updateCarById = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const updates = Object.keys(req.body)
        const allowedUpdates = ["marca", "modelo", "ano", "precioPorDia", "patente", "disponible", "image", "__v"]
        const isValid = updates.every((update) => allowedUpdates.includes(update))
        if (!isValid) {
            return res.status(400).json({ message: "Actualizacion no valida , revise los campos" })
        }
        try {
            if (req.file) {
                req.body.image = req.file.originalname
            }
            const carUpdated = await Car.findByIdAndUpdate(req.params.cid, req.body, { new: true, runValidators: true })
            if (!carUpdated) {
                return res.status(404).json({ message: "No se encontró el auto." })
            }
            res.json({ message: "Se ha actualizado correctamente", car: carUpdated })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    });
}




const rentCar = async (req, res) => {
    try {
        const { cid } = req.params
        const car = await Car.findById(cid)
        if (!car) {
            return res.status(404).json({ message: "No se encontro el auto" })
        }
        if (!car.disponible) {
            return res.status(400).json({ message: "El auto ya esta alquilado" })
        }
        car.rentedBy = req.user._id; // RECORDA! : TENEMOS QUE AGARRAR EL ID DE LA PETICION DEL CLIENTE AL SERVER.
        car.disponible = false

        const updatedCar = await car.save()
        res.json({ message: "Auto alquilado", car: updatedCar })
    }
    catch (err) {
        res.status(500).json({ message: "Error en el servidor", error: err.message })
    }
}


module.exports = { createCar, getAllCars, getCarById, deleteCarById, updateCarById, rentCar }