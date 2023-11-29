const express = require('express');
const dotenv = require("dotenv")
const cors = require('cors')
const path = require ("path")
const carsRouter = require('./routers/carsRouter');




//CONFIGURACIONES
dotenv.config();
const mongoose = require('./config/dbConfig');

const app = express();
const PORT = process.env.PORT || 9000;

//Middlewares
app.use(cors());
app.use(express.static(path.join(__dirname + "/public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.listen(PORT, () => {
    console.log(`El servidor está corriendo en http://localhost:${PORT}`);
})


//Routers 

app.use('/api/cars', carsRouter)