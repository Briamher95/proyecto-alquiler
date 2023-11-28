const express = require("express")
const Car = require("../models/carModel")

//Crear un nuevo auto

const createCar = async (req, res) => {
    const car = new Car({
        marca : req.body.marca,
        modelo : req.body.modelo,
        ano: req.body.ano,
        precioPorDia: req.body.precioPorDia,
        disponible: req.body.disponible
    })

    try{
        const newCar = await car.save();
        res.status(201).json(newCar);
    
    }
    catch(err){
        res.status(400).json({message: err.message})
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
    const {id} = req.params
    try{
        const carById = await Car.findById(id)
        if (!carById){
            return res.status(404).json({message: "No se encontro el auto"})
        }
        res.json(carById)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}



module.exports = {createCar, getAllCars , getCarById}