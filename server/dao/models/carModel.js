const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },
    precioPorDia: {
        type: Number,
        required: true
    },
    patente: {
        type: String,
        unique: true,
    },
    disponible: {
        type: Boolean,
        default: true
    },
    rentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        required : false
    },
});

module.exports = mongoose.model('Car', CarSchema);