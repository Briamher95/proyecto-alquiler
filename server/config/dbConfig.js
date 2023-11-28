//Coneccion con Mongo
const mongoose = require('mongoose')

const CONNECTION_STRING = process.env.CONNECTION_STRING

mongoose.connect(CONNECTION_STRING + "proyecto-alquiler",
{useNewUrlParser: true})
.then(()=>{
    console.log("Conexion exitosa")
})
.catch((error)=>{
    console.error(error)
})

module.exports = mongoose